import express from "express";
import type { Request, Response } from "express";
import { z } from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { UserModel } from "../models/schema.js";
const authRouter = express.Router()

const authSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .trim(),

    email: z.string()
        .trim()
        .toLowerCase()
        .min(1, "Please provide an email address!")
        .pipe(z.email({ message: "Please follow correct email format" })),

    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password too long")
        .regex(/[A-Z]/, "Password Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password Must contain at least one number")
})

const signupHandler = async (req: Request, res: Response) => {
    try {
        const { success, data, error } = authSchema.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                message: z.flattenError(error).fieldErrors
            })
        }
        const { username, email, password } = data
        const isUserExist = await UserModel.findOne({
            $or: [{ username }, { email }]
        })
        if (isUserExist) {
            return res.status(409).json({
                message: "Username or email already exists"
            })
        }

        await UserModel.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })

        return res.status(201).json({
            message: "Signed up successfully"
        })

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
}

const signinHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const User = await UserModel.findOne({ email })
        if (!User) {
            return res.status(404).json({
                message: "User does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, User.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Credentials."
            })
        }

        const token = jwt.sign({ userId: User._id }, process.env.SECRET_KEY!, { expiresIn: "1h" })

        res.cookie("token", token, {
  httpOnly: true,
  secure: true,          // ✅ must be true in production (HTTPS)
  sameSite: "none",      // ✅ required if frontend & backend are on different domains
});

        return res.status(200).json({
            message: "Signed in successfully.",
            token
        })

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
}

authRouter.post('/signup', signupHandler)
authRouter.post('/signin', signinHandler)
authRouter.post('/logout', (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })
    return res.status(200).json({
        message: "Logged out successfully"
    })
})

export default authRouter
