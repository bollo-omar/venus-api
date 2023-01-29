import { Router } from 'express';
import { addUser, getAllUsers, getUserById, login, profile, removeUser } from './user.controller';
import authenticated from '../../../shared/middlewares/auth/auth.middleware';

const userRouter = Router();

userRouter.route('/users/register').post(addUser)
userRouter.route('/users/login').post(login)
userRouter.route('/users/profile').get(authenticated, profile)
userRouter.route('/users/').get(authenticated, getAllUsers)
userRouter.route('/users/:id').get(authenticated, getUserById)
    .delete(authenticated, removeUser)

export default userRouter;