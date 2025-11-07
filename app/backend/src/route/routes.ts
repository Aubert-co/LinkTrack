import { Database } from "../database/db"
import { Repository } from "../repository"
import { Service } from "../service"
import  express, { Request, Response } from "express"
import { Controller } from "../controller"


const route = express()



const db = new Database()

const repository = new Repository(db)
const service = new Service(repository)
const controller = new Controller(service)

route.get('/',async(req:Request,res:Response)=>controller.index(req,res))


route.get('/:code',(req:Request,res:Response)=>controller.getCode(req,res))

export default route