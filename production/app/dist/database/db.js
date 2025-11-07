"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const pg_1 = require("pg");
const DATABASE_URL = process.env.DATABASE_URL;
const MODE = process.env?.MODE;
if (!DATABASE_URL)
    throw new Error("no database URL");
class Database {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: DATABASE_URL
        });
    }
    async query(sql, params) {
        return this.pool.query(sql, params);
    }
    async close() {
        await this.pool.end();
    }
}
exports.Database = Database;
