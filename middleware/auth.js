import { getJwtData } from "../auth/auth.service.js";

export const authMiddleware = async (req, res, next) => {

    const bearerHeader = req.header("Authorization")
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        const auth = await getJwtData(bearerToken)
        if (!auth) {
            res.status(401).json({
                message: "Unauthorized Request!",
                status: 401,
            })
            return
        }
        req.auth = auth
        next()
        return
    }

    res.status(401).json({
        message: "Unauthorized Request!",
        status: 401,
    })
}
