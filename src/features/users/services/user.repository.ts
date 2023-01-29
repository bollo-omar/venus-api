import { db } from '@/shared/utils/db_connect';
import BaseRepository from '@/shared/repositories/base.repository';
import { User } from "@/features/users/models/user.model"
import { Role } from '@prisma/client';

interface AddUserDto {
    readonly name: string;
    readonly username: string;
    readonly role: Role
    readonly password: string;
}

export class UserRepository implements BaseRepository<AddUserDto, User>{
    async create(payload: AddUserDto): Promise<User> {
        const user = await db.user.create({
            data: payload,
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return user;
    }
    async update(id: string, payload: Partial<AddUserDto>): Promise<User> {
        return await db.user.update({
            where: { id },
            data: payload,
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }
    async findById(id: string): Promise<User | null> {
        return await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }
    async findAll(): Promise<User[]> {
        return await db.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }
    async findByUserName(username: string): Promise<User | null> {
        const user = await db.user.findUnique({
            where: { username }
        })
        return user;
    }
    async delete(id: string): Promise<void> {
        await db.user.delete({
            where: { id }
        })
    }

}

export { AddUserDto };