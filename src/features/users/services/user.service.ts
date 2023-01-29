import { User } from "@/features/users/models/user.model";
import { AddUserDto, UserRepository } from './user.repository';
import { generateToken } from "@/shared/utils/generateToken";
import { compare } from "bcryptjs";
import logger from '@/shared/utils/logger';

export class UserService {

    static async createUser(payload: AddUserDto) {
        try {

            const userRepository = new UserRepository();
            const user = await userRepository.create(payload);

            return { data: user };
        } catch (error: any) {
            return {
                status: 'error',
                error: error.code === 'P2002' ? `Account registered with ${payload.username} already exists` : error.message
            }
        }
    }
    static async updateUser(id: string, payload: Partial<AddUserDto>): Promise<User> {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.update(id, payload);

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    static async getAllUsers(): Promise<User[]> {
        try {
            const userRepository = new UserRepository();
            const users = await userRepository.findAll();

            return users;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    static async getUserById(id: string) {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.findById(id);

            return { data: user };
        } catch (error: any) {
            return { status: 'error', error: error.message }
        }
    }

    static async getUserByUserName(username: string): Promise<User | null> {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.findByUserName(username)

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    static async auth(username: string, password: string) {
        try {
            const userRepository = new UserRepository();
            const user = await userRepository.findByUserName(username);
            if (!user?.username) {
                return { status: 'error', message: "User not found" }
            }
            logger.info(await compare(password, user?.password as string))
            if (!(await compare(password, user.password as string))) {
                return { status: 'error', message: "wrong login credentials" }
            }
            const data = {
                name: user.name,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
            return { data: user, token: await generateToken(user.id) }
        } catch (error: any) {
            return { message: error.message };
        }
    }

    static async deleteUser(id: string) {
        try {
            const userRepository = new UserRepository();
            await userRepository.delete(id)

            return { data: "user deleted successfully" }
        } catch (error: any) {
            return { status: 'error', message: error.message }
        }
    }
}