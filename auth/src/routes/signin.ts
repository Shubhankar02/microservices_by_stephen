import express, {Request, Response} from 'express';
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request-middleware";

import {User} from "../models/user-model";
import {BadRequestError} from "../errors/bad-request-error";
import {PasswordServices} from "../services/password-services";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/api/users/sign-in', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (!existingUser) {
        throw  new BadRequestError(`User of email ${email} does not exists`);
    }
    const passwordMatched = await PasswordServices.compare(existingUser.password, password);
    if (!passwordMatched) {
        throw new BadRequestError('Invalid credentials');
    }
    // Generate json web token
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)

    // Store it on session object
    // @ts-ignore
    req.session = {
        jwt: userJwt
    }
    return res.status(201).send(existingUser);
});

export {router as signInRouter};