import { Pool, QueryResult, QueryResultRow } from "pg";
import fs from 'fs/promises'
const DATABASE_URL = process.env.DATABASE_URL
const MODE = process.env?.MODE
if(!DATABASE_URL)throw new Error("no database URL")

export interface DatabaseInt {
    query<T extends QueryResultRow>(sql:string,params?:any[]):Promise<QueryResult<T>>,
    close():void
}
export class Database implements DatabaseInt{
    private pool:Pool
    constructor(){
        this.pool = new Pool({
            connectionString:DATABASE_URL
        })
    }
  
    async query<T extends QueryResultRow>(
        sql: string, params?: any[]
    ):Promise<QueryResult<T>> {
        return this.pool.query<T>(sql, params);
    }
    async close(): Promise<void> {
        await this.pool.end();
    }
}