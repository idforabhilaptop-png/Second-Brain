import type { ReactElement } from "react"

const SidebarItem = ({
    icon,
    title
}: {
    icon: ReactElement,
    title: string
}) => {
    return (
        <>
            <div className="flex items-center gap-2 hover:bg-slate-200 w-full px-5 h-8 cursor-pointer transition-all duration-175">
                {icon}
                <span className="text-gray-500 font-medium">{title}</span>
            </div>
        </>
    )
}
export default SidebarItem