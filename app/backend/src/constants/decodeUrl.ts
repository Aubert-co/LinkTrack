import baseX from 'base-x';
import Hashids from 'hashids';

const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62 = baseX(BASE62_ALPHABET);

if(!process.env.HASHID){
    throw new Error("no .env hashid")
}
const hashid = new Hashids(process.env.HASHID,3)
export function encodeId(id: number,plataform:string): string {
    const hashidEncode = hashid.encode(id)
    const join = hashidEncode + plataform.slice(0,1)
    const baseEncode = base62.encode(Buffer.from(join)) 
    
    return baseEncode
}

type DecodeObject = {
    vacancy_id?:string,
    lastLetter?:string
}
export const getLastsLetter = (value:string)=>{
    const split = value.split('')
    return split[split.length-1]
}
export function decodeId(encoded: string): DecodeObject {
   try{
        const decod = base62.decode( encoded )
 
        const decodeed62 = Buffer.from(decod).toString()
    
        if(!decodeed62)return {vacancy_id:undefined,lastLetter:undefined}
        
        const lastLetter = getLastsLetter(decodeed62)
        const has = hashid.decode(decodeed62.slice(0,-1))
        if(has.length === 0)return {vacancy_id:undefined,lastLetter:undefined}

        return {vacancy_id:has[0].toString(),lastLetter}
   }catch(err){
    return {vacancy_id:undefined,lastLetter:undefined}
   }
}
