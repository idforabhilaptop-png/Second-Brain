import express from "express"
import type { Request, Response } from "express"
import crypto from "crypto"
import userMiddleware from "../middleware/userMiddleware.js"
import mongoose from "mongoose"
import { ContentModel, LinkModel } from "../models/schema.js"
const shareRouter = express.Router()

shareRouter.post('/brain/share', userMiddleware, async (req: Request, res: Response) => {
    try {

        const { share } = req.body

        if (typeof (share) !== 'boolean') {
            return res.status(400).json({
                message: "share field must be a boolean"
            })
        }
        const userId = new mongoose.Types.ObjectId(req.userId)
        const existingLink = await LinkModel.findOne({ userId: userId })

        if (share) {
            if (existingLink) {
                return res.status(200).json({
                    hash: existingLink.hash
                })
            }
            const hash = crypto.randomBytes(10).toString("hex");
            await LinkModel.create({
                hash: hash,
                userId: userId
            })
            return res.status(201).json({
                hash
            })

        } else {
            if (existingLink) {
                await LinkModel.deleteOne({ userId })
                return res.status(200).json({
                    message: "Share link removed successfully"
                })
            }
            return res.status(404).json({
                message: "No share link found to remove"
            })
        }

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
})

shareRouter.get('/brain/:shareLink', async (req: Request, res: Response) => {
    try {

        const hash = String(req.params.shareLink)
        const link = await LinkModel.findOne({ hash })
        if (!link) {
            return res.status(404).json({
                message: "Invalid share link"
            }); // Send error if not found.
        }
        const content = await ContentModel.find({ userId: link.userId })
        .populate({ path: "userId", select: "_id username" })
        .populate({path : "tags" , select : "title"})
        if (content.length === 0) {
            return res.status(404).json({
                message: "No content found for this brain"
            })
        }

        return res.status(200).json({                                         
            content
        })

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }

})

export default shareRouter