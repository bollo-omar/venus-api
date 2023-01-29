import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { UserService } from '@/features/users/services/user.service';
import { AddUserDto } from '@/features/users/services/user.repository';
import { genSalt, hash } from 'bcryptjs';
import Validator from './user.validator';


export const addUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, username, role, password }: AddUserDto = req.body;

    const validator = new Validator();
    const errors = validator.validateAddUser({ name, username, password, role })

    if (errors.length > 0) {
        res.status(400)
        throw new Error(errors[0])
    }
    const user = await UserService.createUser({
        name,
        username,
        role,
        password: await hash(password, await genSalt(10))
    });

    if (user?.status) {
        res.status(400)
        throw new Error(user.error)
    }
    res.status(201).json(user)
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getAllUsers();
    if (user instanceof Error) {
        res.status(400)
        throw new Error(user.message)
    }
    res.status(200).json({ data: user })
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.getUserById(req.params.id);

    if (user.status) {
        res.status(400)
        throw new Error(user.error)
    }
    if (!user.data) {
        res.status(400)
        throw new Error("User not found")
    }
    res.status(200).json(user)

})

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await UserService.auth(username, password)

    if (user?.status) {
        res.status(400)
        throw new Error(user.message)
    }
    res.status(200).json(user);

})

export const profile = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({ data: req.user })
})

export const removeUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await UserService.deleteUser(req.user.id)

    if (user?.status) {
        res.status(400)
        throw new Error(user.message)
    }
    res.status(201).json(user)
})

