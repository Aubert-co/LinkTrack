import { Request, Response } from "express";
import { IService } from "../service";
import { addAccessJob } from "../worker/producer";
import {DB_ERROR, NO_CODE, PORTFOLIO} from '../constants'
import { decodeId } from "../constants/decodeUrl"

export class Controller {
    constructor(protected service:IService){}

    async index(req:Request,res:Response):Promise<any>{
        try{
            
            res.redirect(302,PORTFOLIO)
        }catch(err:unknown){
            res.redirect(302,PORTFOLIO)
        }
    }
    async getCode(req:Request,res:Response):Promise<any>{
        try{
            const code = req.params?.code
            
            if(!req.params.code){
                await addAccessJob(null,NO_CODE)
                res.redirect(302,PORTFOLIO)
                return
            }
            const decode = decodeId(code)
            
            if(!decode.vacancy_id){
                
                res.redirect(302,PORTFOLIO)
            
                return 
            }
            
            const datas = await this.service.getLink(code)
            
            if(datas.length === 0){
              
                res.redirect(302,PORTFOLIO)
                return
            }
            const url = datas[0].original_link
            await addAccessJob( datas[0].vacancy_id,datas[0].link_label)
            res.redirect(302, url )
            
        }catch(err:unknown){
            if(err instanceof Error && err.message === 'DB ERROR'){
                await addAccessJob(null,DB_ERROR)
            }
            res.redirect(302,PORTFOLIO)
        }
    }
}