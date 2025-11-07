"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccessJob = addAccessJob;
const queue_1 = require("./queue");
async function addAccessJob(vacancy_id, source) {
    try {
        await queue_1.insertAccessQueue.add('insert_access_link', {
            vacancy_id,
            source
        });
    }
    catch (err) {
    }
}
