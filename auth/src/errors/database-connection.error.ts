import {CustomError} from "./custom-errors.error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connection to database'

    constructor() {
        super('Error connecting db');

        // Only because we are using the built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{
            message: this.reason
        }]
    }
}