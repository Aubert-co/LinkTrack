"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastsLetter = void 0;
exports.encodeId = encodeId;
exports.decodeId = decodeId;
const base_x_1 = __importDefault(require("base-x"));
const hashids_1 = __importDefault(require("hashids"));
const BASE62_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const base62 = (0, base_x_1.default)(BASE62_ALPHABET);
if (!process.env.HASHID) {
    throw new Error("no .env hashid");
}
const hashid = new hashids_1.default(process.env.HASHID, 3);
function encodeId(id, plataform) {
    const hashidEncode = hashid.encode(id);
    const join = hashidEncode + plataform.slice(0, 1);
    const baseEncode = base62.encode(Buffer.from(join));
    return baseEncode;
}
const getLastsLetter = (value) => {
    const split = value.split('');
    return split[split.length - 1];
};
exports.getLastsLetter = getLastsLetter;
function decodeId(encoded) {
    try {
        const decod = base62.decode(encoded);
        const decodeed62 = Buffer.from(decod).toString();
        if (!decodeed62)
            return { vacancy_id: undefined, lastLetter: undefined };
        const lastLetter = (0, exports.getLastsLetter)(decodeed62);
        const has = hashid.decode(decodeed62.slice(0, -1));
        if (has.length === 0)
            return { vacancy_id: undefined, lastLetter: undefined };
        return { vacancy_id: has[0].toString(), lastLetter };
    }
    catch (err) {
        return { vacancy_id: undefined, lastLetter: undefined };
    }
}
