"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor(db) {
        this.db = db;
    }
    async selectVacancyById(id) {
        try {
            const sql = "SELECT COUNT(*) FROM vacancies WHERE id=$1";
            const values = await this.db.query(sql, [id]);
            return values.rows[0].count;
        }
        catch (err) {
            throw new Error("");
        }
    }
    async selectLink(code) {
        try {
            const sql = "SELECT * FROM links where code=$1";
            const values = await this.db.query(sql, [code]);
            return values.rows;
        }
        catch (err) {
            throw new Error("DB ERROR");
        }
    }
    async increaseAcessedLink({ vacancy_id, source = null }) {
        try {
            const sql = "INSERT INTO accessed_links(vacancy_id,source) VALUES($1,$2)";
            await this.db.query(sql, [vacancy_id, source]);
        }
        catch (err) {
            throw new Error("");
        }
    }
}
exports.Repository = Repository;
