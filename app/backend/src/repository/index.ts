import { DatabaseInt } from "../database/db";
import { IncreaseAccessDTO } from "../types/index";
import { CountQuery,SelectLink } from "../types/database.types";


export interface IRepository{
    selectVacancyById(id:number):Promise<number>,
    selectLink(link:string):Promise<SelectLink[]>
    increaseAcessedLink({vacancy_id,source}:IncreaseAccessDTO):Promise<void>
}
export class Repository implements IRepository{

    constructor(protected db:DatabaseInt){}

    async selectVacancyById(id:number):Promise<number>{
        try{
            const sql = "SELECT COUNT(*) FROM vacancies WHERE id=$1"
            const values = await this.db.query<CountQuery>(sql,[id]) 
            return values.rows[0].count
        }catch(err:unknown){
            throw new Error("")
        }
    }
    async selectLink(code:string):Promise<SelectLink[]>{
        try{
            const sql = "SELECT * FROM links where code=$1"
            const values = await this.db.query<SelectLink>(sql,[code])
    
            return values.rows
        }catch(err:unknown){
            throw new Error("DB ERROR")
        }
    }
    async increaseAcessedLink({vacancy_id,source=null}:IncreaseAccessDTO):Promise<void>{
        try{
            const sql = "INSERT INTO accessed_links(vacancy_id,source) VALUES($1,$2)"

            await this.db.query(sql,[vacancy_id,source])
        }catch(err:unknown){
            throw new Error("")
        }
    }
    
}