import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";
import { UserService } from "@/features/users/services/user.service";
import { IToken, verifyToken } from "@/shared/utils/generateToken";

export const authenticated = asyncHandler(async (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const bearer = request.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer')) {
        response.status(401)
        throw new Error('Unauthorized')
    }

    const token = bearer.split('Bearer ')[1].trim();

    try {
        const payload: IToken | jwt.JsonWebTokenError = await verifyToken(token)
        if (payload instanceof jwt.JsonWebTokenError) {
            response.status(401)
            throw new Error('Unauthorized')
        }

        const user = await UserService.getUserById(payload.id);

        if (!user?.data) {
            response.status(401)
            throw new Error('Unauthorized');
        }

        request.user = user.data;

        next();

    } catch (error) {
        response.status(401)
        throw new Error('Unauthorized');
    }
});

export default authenticated;