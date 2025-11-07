import express from "express";
import { addAccessJob } from "./worker/producer";
import { INVALID_URL, PORTFOLIO, } from './constants'
import route from "./route/routes";
import helmet from "helmet";
import rateLimit from 'express-rate-limit'

const app = express()

app.set('trust proxy',1)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false, 
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});
app.use( globalLimiter )
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true
    },
  })
);

app.use(route)

app.use(async(req,res)=>{
    await addAccessJob(null,INVALID_URL)
    res.redirect(302,PORTFOLIO)
})

export default app