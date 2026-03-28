import { useState, type Dispatch, type SetStateAction } from "react"
import { CrossIcon } from "../Icons/CrossIcon"
import Button from "./Button"
import { Copy } from "lucide-react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Link } from "react-router"


interface ShareProps {
    shareBoxOpen: boolean
    setShareBoxOpen: Dispatch<SetStateAction<boolean>>
}

const ShareContent = ({ shareBoxOpen, setShareBoxOpen }: ShareProps) => {

    const [error, setError] = useState("")
    const [hash, setHash] = useState("")

    const handleShare = async () => {
        try {
            setError("")
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
            }, {
                withCredentials: true
            })
            setHash(response?.data?.hash)
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
                {shareBoxOpen && (
                    <div
                        className="w-screen h-screen bg-black/40 backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center z-50"
                        onClick={() => {
                            setShareBoxOpen(false)
                            setError("")
                            setHash("")
                        }}
                    >
                        <div
                            className="bg-white rounded-xl p-6 border border-gray-200 shadow-xl w-full max-w-md mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-base font-semibold text-gray-800">Share Your Second Brain</h2>
                                <div
                                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 cursor-pointer transition-colors"
                                    onClick={() => {
                                        setShareBoxOpen(false)
                                        setError("")
                                        setHash("")
                                    }}
                                >
                                    <CrossIcon />
                                </div>
                            </div>

                            <div className="mb-2.5">
                                <p className=" text-sm text-slate-500">
                                    Share your entire collection of notes, documents,
                                    tweets, and videos with others. They'll be able to
                                    import your content into their own Second Brain.
                                </p>
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">{error}</p>
                            )}

                            {
                                !error && hash && (
                                    <Link to={`/sharedDashBoard/${hash}`}>
                                        <p className="text-sm">Your url : /sharedDashboard/{hash}</p>
                                    </Link>
                                )
                            }

                            <div className="mt-4 w-full flex justify-between items-center">
                                <Button variant="primary" size="md" text="Share Brain" startIcon={<Copy />}
                                    onClick={handleShare} />
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default ShareContent