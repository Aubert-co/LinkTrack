"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
const repository_1 = require("../repository");
const service_1 = require("../service");
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const route = (0, express_1.default)();
const db = new db_1.Database();
const repository = new repository_1.Repository(db);
const service = new service_1.Service(repository);
const controller = new controller_1.Controller(service);
route.get('/', async (req, res) => controller.index(req, res));
route.get('/:code', (req, res) => controller.getCode(req, res));
exports.default = route;
