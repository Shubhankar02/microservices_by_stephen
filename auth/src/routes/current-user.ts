import express from 'express';

import {currentUser} from "../middlewares/current-user.middleware";
import {requireAuth} from "../middlewares/require-auth.middleware";

const router = express.Router();

router.get('/api/users/current-user', currentUser, requireAuth, (req, res) => {
    res.send({currentUser: req.currentUser || null})
});

export {router as currentUserRouter};