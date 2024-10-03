import userController from '../../controller/userController.js';
import express from 'express';


const userRouter = express.Router();
userRouter.post('/', userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);


export default userRouter;