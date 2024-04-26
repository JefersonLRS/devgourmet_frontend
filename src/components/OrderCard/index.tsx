import Image from "next/image"
import mesasIcone from "@/assets/images/mesasIcone.svg"

export default function OrderCard({ key, table }: { key: string, table: number | string }) {

    return (
        <div className="w-full my-3" key={key}>
            <div className="bg-white w-full flex">
                <div className="bg-yellow-gourmet w-3"></div>
                <div className="flex gap-6 ml-2 p-3 md:p-4 font-medium">
                    <Image src={mesasIcone} className="w-[30px]" alt="Mesa"/>
                    <p>Mesa {table}</p>
                </div>
            </div>
        </div>
    )
}