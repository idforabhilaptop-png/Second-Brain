import { useState } from "react"
import { CrossIcon } from "../Icons/CrossIcon"
import Button from "./Button"
import Input from "./Input"
import axios from "axios"
import { BACKEND_URL } from "../config"

type CreateContentProps = {
    open: boolean
    onClose: () => void

    title: string
    setTitle: (value: string) => void

    link: string
    setLink: (value: string) => void

    type: string
    setType: (value: string) => void

    tags: string
    setTags: (value: string) => void

    setContentBoxOpen: (value: boolean) => void
}

const CreateContent = ({ open, onClose, title, setTitle, link, setLink, type, setType, tags, setTags, setContentBoxOpen }: CreateContentProps) => {
    const [error, setError] = useState("")
    const addContent = async () => {
        try {
            setError("")
            const tagsArray = tags.split(",").map(tag => tag.trim())
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link, title, type,
                tags: tagsArray
            }, { withCredentials: true })
            console.log(response)
            setTitle("")
            setLink("")
            setType("")
            setTags("")
            setContentBoxOpen(false)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const serverMessage = error?.response?.data?.message
                if (serverMessage) {
                    setError(serverMessage)
                } else {
                    setError("Something went wrong. Please try again.")
                }
            } else {
                setError("Something went wrong. Please try again.")
            }
        }
    }
    return (
        <>
            <div>
                {open && (
                    <div
                        className="w-screen h-screen bg-black/40 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center z-50"
                        onClick={onClose}
                    >
                        <div
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-xl w-full max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-base font-semibold text-gray-800">Add Content</h2>
                                <div
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 cursor-pointer transition-colors"
                                    onClick={onClose}
                                >
                                    <CrossIcon />
                                </div>
                            </div>

                            {/* Form */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Title</label>
                                    <Input placeholder="e.g. My favourite video"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Link</label>
                                    <Input placeholder="e.g. https://youtube.com/..."
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="text-[14px] py-2 px-3.5 outline-none border border-slate-500 w-[90%] bg-white text-gray-700 cursor-pointer rounded-sm"
                                    >
                                        <option value="" disabled>Select a type</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                        <option value="article">Article</option>
                                        <option value="audio">Audio</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">Tags</label>
                                    <Input placeholder="e.g. tech, AI, news"
                                        value={tags}
                                        onChange={(e) => { setTags(e.target.value) }} />
                                </div>

                                {error && (
                                    <p className="mt-3 text-[13px] text-red-500">{error}</p>
                                )}

                                <div className="pt-1">
                                    <Button variant="primary" text="Submit" size="md" onClick={addContent} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default CreateContent