import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../components/Card"
import { BACKEND_URL } from "../config"

interface ContentItem {
    _id: string
    title: string
    type: "youtube" | "twitter"
    link: string
    tags: { _id: string; title: string }[]
    createdAt: string
    userId: { _id: string; username: string }
}

const SharedDashboard = () => {
    const { id } = useParams()
    const [contents, setContents] = useState<ContentItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const fetchSharedContent = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${id}`)
                const data: ContentItem[] = response.data.content
                setContents(data)
                if (data.length > 0) {
                    setUsername(data[0].userId.username)
                }
                setError("")
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    setError(err?.response?.data?.message || "Failed to load shared content.")
                } else {
                    setError("Something went wrong.")
                }
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchSharedContent()
    }, [id])

    return (
        <div className="min-h-screen bg-slate-100 px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {username ? `${username}'s Brain` : "Shared Brain"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    {contents.length > 0 ? `${contents.length} item${contents.length > 1 ? "s" : ""}` : ""}
                </p>
            </div>

            {loading && <p className="text-sm text-slate-500">Loading...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!loading && !error && contents.length === 0 && (
                <p className="text-sm text-slate-500">No content found for this shared brain.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {contents.map((item) => (
                    <Card
                        key={item._id}
                        id={item._id}
                        title={item.title}
                        type={item.type}
                        link={item.link}
                        tags={item.tags}
                        createdAt={item.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default SharedDashboard