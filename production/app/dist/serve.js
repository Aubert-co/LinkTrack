"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producer_1 = require("./worker/producer");
const constants_1 = require("./constants");
const routes_1 = __importDefault(require("./route/routes"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    }
});
app.use(globalLimiter);
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        useDefaults: true
    },
}));
app.use(routes_1.default);
app.use(async (req, res) => {
    await (0, producer_1.addAccessJob)(null, constants_1.INVALID_URL);
    res.redirect(302, constants_1.PORTFOLIO);
});
app.listen(process.env.PORT, () => {
    console.log('running');
});
