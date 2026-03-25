import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { UserModel } from "../models/schema.js"

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "Please Sign in."
            })
        }
        const { userId } = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
        const user = await UserModel.findOne({ _id: userId })
        if (!user) {
            return res.status(404).json({
                message: "User does not exist."
            })
        }
        req.userId = userId
        next()

    } catch (err) {
        const error = err as Error
        return res.status(403).json({              // 500 Internal Server Error
            message: error.message
        })
    }
}

export default userMiddleware