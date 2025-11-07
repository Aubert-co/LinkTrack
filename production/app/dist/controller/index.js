"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const producer_1 = require("../worker/producer");
const constants_1 = require("../constants");
const decodeUrl_1 = require("../constants/decodeUrl");
class Controller {
    constructor(service) {
        this.service = service;
    }
    async index(req, res) {
        try {
            await (0, producer_1.addAccessJob)(null, constants_1.UNKNOWN);
            res.redirect(302, constants_1.PORTFOLIO);
        }
        catch (err) {
            res.redirect(302, constants_1.PORTFOLIO);
        }
    }
    async getCode(req, res) {
        try {
            const code = req.params?.code;
            if (!req.params.code) {
                await (0, producer_1.addAccessJob)(null, constants_1.NO_CODE);
                res.redirect(302, constants_1.PORTFOLIO);
                return;
            }
            const decode = (0, decodeUrl_1.decodeId)(code);
            if (!decode.vacancy_id) {
                await (0, producer_1.addAccessJob)(null, constants_1.INVALIDE_CODE);
                res.redirect(302, constants_1.PORTFOLIO);
                return;
            }
            const datas = await this.service.getLink(code);
            if (datas.length === 0) {
                await (0, producer_1.addAccessJob)(null, constants_1.INVALIDE_CODE);
                res.redirect(302, constants_1.PORTFOLIO);
                return;
            }
            const url = datas[0].original_link;
            await (0, producer_1.addAccessJob)(datas[0].vacancy_id, datas[0].link_label);
            res.redirect(302, url);
        }
        catch (err) {
            if (err instanceof Error && err.message === 'DB ERROR') {
                await (0, producer_1.addAccessJob)(null, constants_1.DB_ERROR);
            }
            res.redirect(302, constants_1.PORTFOLIO);
        }
    }
}
exports.Controller = Controller;
