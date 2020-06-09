import {CustomError} from "./custom-errors.error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor() {
        super('Not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message}];
    }
}