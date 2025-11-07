"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAccessQueue = exports.connection = void 0;
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
    throw new Error('Undefined  redis url');
}
exports.connection = new ioredis_1.default(REDIS_URL, {
    maxRetriesPerRequest: null
});
exports.insertAccessQueue = new bullmq_1.Queue('insert_access_link', {
    connection: exports.connection
});
