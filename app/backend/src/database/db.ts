import { Pool, QueryResult, QueryResultRow } from "pg";
import fs from 'fs/promises'
const DATABASE_URL = process.env.DATABASE_URL
const MODE = process.env?.MODE
if(!DATABASE_URL)throw new Error("no database URL")

export class Database {
    private pool:Pool
    constructor(){
        this.pool = new Pool({
            connectionString:DATABASE_URL
        })
        if(MODE === "test"){
            this.initSchema()
        }
        
    }
    private async initSchema(): Promise<void> {
        try {
        const query = await fs.readFile('./schema.sql', 'utf-8');
        await this.pool.query(query);
        console.log(' Schema carregado com sucesso');
        } catch (error) {
        console.error(' Erro ao carregar schema:', error);
        }
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