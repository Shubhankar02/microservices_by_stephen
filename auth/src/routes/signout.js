"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOutRouter = void 0;
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.signOutRouter = router;
router.post('/api/users/sign-out', function (req, res) {
    req.session = null;
    res.send({});
});
