import SideBar from "../SideBar"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex">
            <div className="flex flex-[1]">
                <SideBar/>
            </div>
            <div className="flex-[5] p-6">
                {children}
            </div>
        </div>
    )
}