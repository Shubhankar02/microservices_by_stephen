"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custom_errors_error_1 = require("../errors/custom-errors.error");
exports.errorHandler = function (err, req, res, next) {
    if (err instanceof custom_errors_error_1.CustomError) {
        return res.status(err.statusCode).json({ error: err.serializeErrors() });
    }
    res.status(400).send({
        message: err.message
    });
};
