import {Database} from '../../database/db'
import path from 'path'
import fs from 'fs/promises'
import { encodeId } from '../../constants/decodeUrl';
const db = new Database();

export const encode = encodeId(1,'linkedin');
export const mockUrl = "http://localhost:5173/login";
(async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const query = await fs.readFile(schemaPath, 'utf-8');
    await db.query(query);
 
  } catch (error) {
    throw error
  }
})();
export const createVacancies = async()=>{
 try{
      await db.query(`INSERT INTO vacancies (
        id,
        link_vacancy,
        description,
        resume_used,
        vacancy_level,
        status,
        plataform
        ) VALUES (
            1,
        'https://jobs.br.linkedin.com/view/123456789',
        'Desenvolvedor Full Stack com foco em Node.js e React',
        'resume_aubert.pdf',
        'Pleno',
        'Aberta',
        'LinkedIn'
        );
`)
 }catch(err:unknown){
    throw err
 }
}
export const createLinks = async()=>{
  try{
    await db.query(`INSERT INTO links(vacancy_id,link_label,original_link,code) VALUES(1,'linkedin','${mockUrl}','${encode}')`)
  }catch(err){
    throw err
  }
}
export const cleanLinks = async()=>{
  try{
    await db.query('DELETE FROM links WHERE id>0')
  }catch(err:unknown){
    throw err
  }
} 
export const cleanVacancies = async()=>{
    try{
        await db.query('DELETE FROM vacancies WHERE id>0')
    }catch(err:unknown){
        throw  err
    }
}

export const cleanAccessedLinks = async()=>{
    try{
        await db.query('DELETE FROM accessed_links where id>0')
    }catch(err:unknown){
        throw err
    }
}