import { secret } from "./jwt.secret.js"
import jwt from "jsonwebtoken"


export const getJwtData = async (token) => {
    return jwt.verify(token, secret, (err, authData) => {
        if (err) {
            return null
        }
        return {
            id: authData.id,
            email: authData.email,
            isAdmin:authData.isAdmin,
            isVerified:authData.isVerified

        }
    })
}


