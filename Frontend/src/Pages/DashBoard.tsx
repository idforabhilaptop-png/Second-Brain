import { useState, useEffect } from "react"
import { Plus, Share2 } from "lucide-react"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import CreateContent from "../components/CreateContent"
import Button from "../components/Button"
import Card from "../components/Card"
import { BACKEND_URL } from "../config"
import { Logout } from "../Icons/Logout"
import { useNavigate } from "react-router"
import ShareContent from "../components/ShareContent"

interface ContentItem {
  _id: string
  title: string
  type: "youtube" | "twitter"
  link: string
  tags: { _id: string; title: string }[]
  createdAt: string
}

const DashBoard = () => {
  const [contentBoxOpen, setContentBoxOpen] = useState(false)
  const [shareBoxOpen, setShareBoxOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [type, setType] = useState("")
  const [tags, setTags] = useState("")
  const [contents, setContents] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchContent = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        withCredentials: true
      })
      setContents(response.data.content)
      setError("")
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.message || "Failed to fetch content.")
      } else {
        setError("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    setContents(prev => prev.filter(item => item._id !== id))
  }

  const handleLogout = async () => {
    await axios.post(
      `${BACKEND_URL}/api/v1/logout`,
      {},
      { withCredentials: true }
    )
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  useEffect(() => {
    fetchContent()
  }, [contentBoxOpen])

  return (
    <div className="flex w-full min-h-screen bg-slate-100">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static z-30 h-full lg:h-auto
        w-64 lg:w-[14.5%] bg-white
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        border-r border-gray-200 shadow-sm lg:shadow-none
      `}>
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen lg:w-[85.5%]">

        <CreateContent open={contentBoxOpen} onClose={() => {
          setContentBoxOpen(false)
          fetchContent()  // refresh cards after adding content
        }}
          title={title}
          setTitle={setTitle}
          link={link}
          setLink={setLink}
          type={type}
          setType={setType}
          tags={tags}
          setTags={setTags}
          setContentBoxOpen={setContentBoxOpen} />

        <ShareContent
          shareBoxOpen={shareBoxOpen}
          setShareBoxOpen={setShareBoxOpen} />

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 bg-slate-100 sticky top-0 z-10 border-b border-slate-200">

          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600 mb-1" />
              <div className="w-5 h-0.5 bg-gray-600" />
            </button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              All Notes
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="secondary" size="md" text="Share Brain" startIcon={<Share2 size={16} />}
              onClick={() => setShareBoxOpen(true)}
            />
            <Button variant="primary" size="md" text="Add Content" startIcon={<Plus size={16} />}
              onClick={() => setContentBoxOpen(true)}
            />
            <button onClick={handleLogout}>
              <Logout />
            </button>

          </div>
        </div>

        {/* Cards grid */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
          {loading && (
            <p className="text-sm text-slate-500">Loading...</p>
          )}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          {!loading && !error && contents.length === 0 && (
            <p className="text-sm text-slate-500">No content yet. Add something!</p>
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashBoard