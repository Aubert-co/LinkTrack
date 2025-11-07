export type Vacancies = {
    id:number,
    link_vacancy:string,
    description:string,
    resume_used:string,
    vacancy_level:string,
    status:string,
    created_at:string
}


export type IncreaseAccessDTO ={
    vacancy_id:number
    source?:string | null
}