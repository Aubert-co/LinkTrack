import { insertAccessQueue } from "./queue";

export async function addAccessJob(vacancy_id:number | null,source:string ){
    try{
         await insertAccessQueue.add('insert_access_link',{
            vacancy_id,
            source
        })
    }catch(err:unknown){
        
    }
}