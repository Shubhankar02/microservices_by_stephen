import {Request, Response, NextFunction} from "express";
import {CustomError} from "../errors/custom-errors.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({error: err.serializeErrors()})
    }
    res.status(400).send({
        message: err.message
    })
}