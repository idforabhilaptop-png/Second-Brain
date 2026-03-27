import { Trash2, Link, XIcon } from "lucide-react"
import YouTubeIcon from "../Icons/Youtube"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface CardProps {
    id: string
    title: string
    link: string
    type: "youtube" | "twitter"
    tags: { _id: string; title: string }[]
    createdAt: string
    onDelete: (value: string) => void
}

// Convert any YouTube URL format to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
    try {
        const parsed = new URL(url)
        // youtu.be/VIDEO_ID
        if (parsed.hostname === "youtu.be") {
            return `https://www.youtube.com/embed${parsed.pathname}`
        }
        // youtube.com/watch?v=VIDEO_ID
        const videoId = parsed.searchParams.get("v")
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`
        }
        // already an embed URL
        if (parsed.pathname.startsWith("/embed/")) {
            return url
        }
    } catch {
        // fallback: try the naive replace approach
    }
    return url.replace("watch", "embed").replace("?v=", "/")
}

const Card = (props: CardProps) => {
    const { title, link, type, tags, createdAt } = props

    const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this content?")
        if (!confirmed) return

        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${props.id}`, { withCredentials: true })
            props.onDelete(props.id)
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const serverError = err?.response?.data?.message
                if (serverError) alert(serverError)
                else alert("Something went wrong")
            } else {
                alert("Something went wrong")
            }
        }
    }

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-75 h-87.5">
            {/* Header */}
            <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="shrink-0">
                        {type === "youtube" ? <YouTubeIcon /> : <XIcon />}
                    </div>
                    <span className="font-semibold text-sm text-gray-800 leading-snug line-clamp-2">
                        {title}
                    </span>
                </div>

                <div className="flex items-center gap-3 shrink-0 mt-0.5">
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Open link"
                    >
                        <Link className="size-4" />
                    </a>
                    <button
                        className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label="Delete"
                        onClick={handleDelete}
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            </div>

            {/* Embed area */}
            {type === "youtube" && (
                <div className="rounded-lg overflow-hidden aspect-video bg-black">
                    <iframe
                        className="w-full h-full"
                        src={getYouTubeEmbedUrl(link)}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            )}

            {type === "twitter" && (
                <div className="h-[60%] overflow-y-scroll no-scrollbar">
                    <div className="rounded-lg overflow-hidden flex justify-center items-center">
                        <blockquote className="twitter-tweet" data-dnt="true">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                        <script async src="https://platform.twitter.com/widgets.js"></script>
                    </div>
                </div>

            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                    <span
                        key={tag._id}
                        className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium"
                    >
                        #{tag.title}
                    </span>
                ))}
            </div>

            {/* Date */}
            <p className="text-xs text-gray-400 mt-2">
                Added on {formattedDate}
            </p>

        </div>
    )
}

export default Card