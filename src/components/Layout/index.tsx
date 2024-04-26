import { useEffect, useState } from "react"
import SideBar from "../SideBar"
import SideBarMobile from "../SideBarMobile"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {

        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [])

    return (
        <div>
            {!isMobile && (
            <div className="flex">
                <div className="flex flex-[1]">
                    <SideBar/>
                </div>
                <div className="flex-[5] p-6">
                    {children}
                </div>
            </div>
            )}
            {isMobile && (
                <div className="flex flex-col">
                    <div className="flex-[1]">
                        <SideBarMobile/>
                    </div>
                    <div className="flex-[5] p-6">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}