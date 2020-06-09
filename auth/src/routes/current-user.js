"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserRouter = void 0;
var express_1 = __importDefault(require("express"));
var current_user_middleware_1 = require("../middlewares/current-user.middleware");
var require_auth_middleware_1 = require("../middlewares/require-auth.middleware");
var router = express_1.default.Router();
exports.currentUserRouter = router;
router.get('/api/users/current-user', current_user_middleware_1.currentUser, require_auth_middleware_1.requireAuth, function (req, res) {
    res.send({ currentUser: req.currentUser || null });
});
