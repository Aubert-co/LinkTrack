import { Queue } from "bullmq";


import ioRedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL

if(!REDIS_URL){
    throw new Error('Undefined  redis url')
}

export const connection = new ioRedis( REDIS_URL,{
    maxRetriesPerRequest:null
} )


export const insertAccessQueue = new Queue('insert_access_link',{
    connection
})