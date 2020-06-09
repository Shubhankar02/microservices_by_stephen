import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser'
import mongoose from 'mongoose';
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/current-user";
import {signUpRouter} from "./routes/signup";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {errorHandler} from "./middlewares/error-handler.middleware";
import {NotFoundError} from "./errors/not-found.error";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true// Must be on https connection,
}))
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-serv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('connected to mongodb');
    } catch (err) {
        console.log('error', err);
    }
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
}

start()