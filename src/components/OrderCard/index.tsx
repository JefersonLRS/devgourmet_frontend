import Image from "next/image"
import mesasIcone from "@/assets/images/mesasIcone.svg"

export default function OrderCard({ key, table, status }: { key: string, table: number | string, status?: boolean}) {
    
    const aguardando = "bg-yellow-gourmet w-3 rounded-l-md"
    const atendidos = "bg-purple-gourmet w-3 rounded-l-md"
    
    return (
        <div className="w-full" key={key}>
            <div className="bg-white w-full flex rounded-md">
                <div className={`${status == true ? atendidos : aguardando}`}></div>
                <div className="flex gap-6 ml-2 p-3 md:p-4 font-medium">
                    <Image src={mesasIcone} className="w-[30px]" alt="Mesa"/>
                    <p>Mesa {table}</p>
                </div>
            </div>
        </div>
    )
}