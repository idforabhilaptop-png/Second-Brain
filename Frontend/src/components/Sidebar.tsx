import { ComplexIcon } from "../Icons/ComplexIcon"
import { Document } from "../Icons/Document"
import { Link } from "../Icons/Link"
import { Tag } from "../Icons/Tag"
import { Twitter } from "../Icons/Twitter"
import { Video } from "../Icons/Video"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
    return (
        <>
            <div className="w-full">
                <div className="flex justify-center items-center gap-2 py-5">
                    <ComplexIcon />
                    <h1 className="font-bold text-[22px]">Second Brain</h1>
                </div>
                <div className="flex flex-col gap-5 justify-start items-start w-full">
                    <SidebarItem icon={<Twitter />} title={"Twitter"} />
                    <SidebarItem icon={<Video />} title={"Videos"} />
                    <SidebarItem icon={<Document />} title={"Document"} />
                    <SidebarItem icon={<Link />} title={"Links"} />
                    <SidebarItem icon={<Tag />} title={"Tags"} />
                </div>
            </div>
        </>
    )
}
export default Sidebar