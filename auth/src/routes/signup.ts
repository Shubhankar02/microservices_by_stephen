import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {body} from "express-validator";
import {BadRequestError} from "../errors/bad-request-error";
import {validateRequest} from "../middlewares/validate-request-middleware";
import {User} from "../models/user-model";

const router = express.Router();

router.post('/api/users/sign-up', [
    body('email')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 to 20 characters')
], validateRequest, async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new BadRequestError('Email already in use');
    }
    const user = User.build({email, password});
    await user.save();

    // Generate json web token
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    // Store it on session object
    // @ts-ignore
    req.session = {
        jwt: userJwt
    }
    return res.status(201).send(user);
});

export {router as signUpRouter};