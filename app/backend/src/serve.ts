import express from "express";


const app = express()



app.get('/',(req,res)=>{
    res.redirect(302,'https://www.google.com.br/index.html')
})

app.listen(3000,()=>{
    console.log('running')
})