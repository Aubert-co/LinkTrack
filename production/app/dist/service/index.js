"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(repository) {
        this.repository = repository;
    }
    async getLink(code) {
        return await this.repository.selectLink(code);
    }
    async increaseVacancy({ vacancy_id, source }) {
        await this.repository.increaseAcessedLink({ vacancy_id, source });
    }
}
exports.Service = Service;
