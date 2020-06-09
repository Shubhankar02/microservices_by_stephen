"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizeError = void 0;
var custom_errors_error_1 = require("./custom-errors.error");
var NotAuthorizeError = /** @class */ (function (_super) {
    __extends(NotAuthorizeError, _super);
    function NotAuthorizeError() {
        var _this = _super.call(this, 'Not authorized') || this;
        _this.statusCode = 401;
        Object.setPrototypeOf(_this, NotAuthorizeError.prototype);
        return _this;
    }
    NotAuthorizeError.prototype.serializeErrors = function () {
        return [{
                message: 'Not authorized'
            }];
    };
    return NotAuthorizeError;
}(custom_errors_error_1.CustomError));
exports.NotAuthorizeError = NotAuthorizeError;
