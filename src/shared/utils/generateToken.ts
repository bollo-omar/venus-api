import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/shared/utils/constants"

export interface IToken {
    id: string;
    expiresIn: number
}

export const generateToken = async (id: string) => {
    return jwt.sign({
        id
    },
        JWT_SECRET
        ,
        {
            expiresIn: '8760H'
        }
    )
}
export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {

    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET as jwt.Secret, (err, payload) => {
            if (err) return reject(err);

            resolve(payload as IToken)
        })
    })
}

export default { generateToken, verifyToken }