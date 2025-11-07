import { IRepository } from "../repository";
import { IncreaseAccessDTO } from "../types";
import { SelectLink } from "../types/database.types";

export interface IService  {
    getLink(code:string):Promise<SelectLink[]>
    increaseVacancy({vacancy_id,source}:IncreaseAccessDTO):Promise<void>
}
export class Service implements IService{
    constructor(protected repository:IRepository){}

    async getLink(code:string):Promise<SelectLink[]>{
        return await this.repository.selectLink(code)
    }
    async increaseVacancy({vacancy_id,source}:IncreaseAccessDTO):Promise<void>{
        await this.repository.increaseAcessedLink({vacancy_id,source})
    }
}