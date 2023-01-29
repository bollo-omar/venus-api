import { BaseModel } from 'shared/models/base.model';

export interface User extends BaseModel {
    readonly id: string;
    readonly name: string;
    readonly username: string;
    readonly role: string;
    readonly password?: string;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;
}