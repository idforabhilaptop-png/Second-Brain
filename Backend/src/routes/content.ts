import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import { z } from "zod"
import userMiddleware from "../middleware/userMiddleware.js";
import { ContentModel, TagModel } from "../models/schema.js";
const contentRouter = express.Router()

const contentSchema = z.object({
    link: z.string().pipe(z.url()),
    title: z.string().min(1),
    type: z.enum(["image", "video", "article", "audio" , "twitter" , "youtube"]),
    tags: z.array(z.string()).optional()
})

contentRouter.post('/content', userMiddleware, async (req: Request, res: Response) => {
    try {
        const { success, data, error } = contentSchema.safeParse(req.body)
        if (!success) {
            return res.status(400).json({
                message: z.flattenError(error).fieldErrors
            })
        }
        const { link, title, type, tags } = data;

        const tagIds: mongoose.Types.ObjectId[] = [];
        if (tags !== undefined) {
            //  creating the tags on the go if does not exist 
            for (let tagName of tags) {
                tagName = tagName.toLowerCase().trim();
                let tag = await TagModel.findOne({ title: tagName });
                if (!tag) {
                    tag = await TagModel.create({ title: tagName });
                }
                tagIds.push(tag._id);
            }
        }

        await ContentModel.create({
            link, type, title,
            userId: new mongoose.Types.ObjectId(req.userId),
            tags: tagIds
        })
        return res.status(201).json({
            message: "Content added successfully"
        })
    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
})

contentRouter.get('/content', userMiddleware, async (req: Request, res: Response) => {
    try {

        const userId = new mongoose.Types.ObjectId(req.userId);
        const content = await ContentModel
            .find({ userId: userId })
            .populate({ path: "userId", select: "username" })
            .populate({ path: "tags", select: "title" })
        if (content.length === 0) {
            return res.status(404).json({
                message: "No content found"
            })
        }
        return res.status(200).json({
            content: content
        })

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
})

contentRouter.delete('/content/:id', userMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const content = await ContentModel.findById(id)

        if (!content) {
            return res.status(404).json({
                message: "Content not found"
            })
        }

        // check if content belongs to the use
        if (content.userId.toString() !== req.userId) {
            return res.status(403).json({                   // 403 Forbidden
                message: "You are not authorized to delete this content"
            })
        }

        await ContentModel.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Content deleted successfully"
        })

    } catch (err) {
        const error = err as Error
        return res.status(500).json({
            message: error.message
        })
    }
})

export default contentRouter