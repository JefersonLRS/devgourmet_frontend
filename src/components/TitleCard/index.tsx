import Image from "next/image"

interface TitleCardProps {
    icon: any;
    title: string;
}

export default function TitleCard({ icon, title }: TitleCardProps) {
    return (
        <div className="w-full flex items-center gap-5 py-3 md:py-5 px-6 bg-white font-semibold md:font-bold 
        md:text-2xl shadow-md rounded-md">
            <Image src={icon} className="w-[15px] md:w-[25px]" alt="Icone"/>
            <h1>{title}</h1>
        </div>
    )
}