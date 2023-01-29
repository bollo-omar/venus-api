import { compare, genSaltSync,compareSync, hashSync } from "bcryptjs"

export const hashPasword = (password: string) => {
    return hashSync(password, genSaltSync(10))
}

export const comparePassword = (password: string, hash: string) => {
    return compareSync(password, hash);
}