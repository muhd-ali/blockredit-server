"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const BankAccountManager_1 = require("../../models/BankAccountManager");
router.get('/user=:userID', (req, res) => {
    const userID = req.params.userID;
    BankAccountManager_1.createFromUser(userID)
        .getList()
        .then((list) => {
        res.send(list);
    })
        .catch(() => {
        res.sendStatus(401);
    });
});
exports.default = router;
//# sourceMappingURL=handler.js.map