import userController from '../../controller/userController.js';
import express from 'express';


const userRouter = express.Router();
userRouter.post('/', userController.createUser);

export default userRouter;