import mongoose from "mongoose";
const { Schema } = mongoose

const User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,                
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,            
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})
const UserModel = mongoose.model("users", User)


const Tag = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
const TagModel = mongoose.model("tags", Tag)


const contentTypes = ['image', 'video', 'article', 'audio' , 'youtube' , 'twitter'];
const Content = new Schema({
    link:
    {
        type: String,
        required: true
    },
    type:
    {
        type: String,
        enum: contentTypes,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tags'

        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
} , {
    timestamps : true
});
const ContentModel = mongoose.model("content", Content)


// fixed schema
const Link = new Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    }
})
const LinkModel = mongoose.model("link", Link)

export { UserModel, TagModel, ContentModel, LinkModel }