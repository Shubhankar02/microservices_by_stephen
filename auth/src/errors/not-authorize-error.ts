import {CustomError} from "./custom-errors.error";

export class NotAuthorizeError extends CustomError {
    statusCode = 401;

    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizeError.prototype)
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: 'Not authorized'
        }];
    }
}