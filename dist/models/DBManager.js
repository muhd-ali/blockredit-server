"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __importDefault(require("mongodb"));
const MongoClient = mongodb_1.default.MongoClient;
const dbUrl = 'mongodb://venom:abc321456321@ds151416.mlab.com:51416/blockredit';
class DBManager {
    constructor(url) {
        this.url = url;
    }
    connectAndUseDBObject(useDB) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.url, { useNewUrlParser: true }, (err, db) => {
                if (err) {
                    throw err;
                }
                const dbo = db.db('blockredit');
                useDB(dbo)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error))
                    .finally(() => {
                    db.close();
                });
            });
        });
    }
}
exports.dbManager = new DBManager(dbUrl);
//# sourceMappingURL=DBManager.js.map