"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBManager_1 = require("./DBManager");
class BankAccountManager {
    constructor(user) {
        this.user = user;
    }
    getList() {
        return DBManager_1.dbManager.connectAndUseDBObject((dbo) => new Promise((resolve, reject) => {
            const groups = dbo.collection('bank_accounts');
            const query = { user: this.user };
            groups.find(query).toArray((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        }));
    }
}
function createFromUser(user) {
    return new BankAccountManager(user);
}
exports.createFromUser = createFromUser;
//# sourceMappingURL=BankAccountManager.js.map