"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('<h1>Server is on.</h1>');
});
exports.default = router;
//# sourceMappingURL=handler.js.map