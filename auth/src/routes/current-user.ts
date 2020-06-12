import express from 'express';
import {currentUser} from "../middlewares/current-user.middleware";

const router = express.Router();

router.get('/api/users/current-user', currentUser, (req, res) => {
    return  res.status(200).send({currentUser: req.currentUser || null})
});

export {router as currentUserRouter};