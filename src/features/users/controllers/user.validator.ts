import { AddUserDto } from "../services/user.repository";

export default class Validator {

    validateAddUser(payload: AddUserDto) {
        let errors = [];

        if (!payload.name) {
            errors.push("name is required")
        }
        else if (!payload.username) {
            errors.push("username is require")
        }
        else if (!payload.role) {
            errors.push("role is required")
        }
        else if (!payload.password) {
            errors.push("password is required")
        }
        return errors;
    }
    validateAuth(email: string, password: string) {
        let errors = [];

        if (!email) {
            errors.push("email is required")
        }
        if (!password) {
            errors.push("password is required")
        }
        return errors;
    }
}