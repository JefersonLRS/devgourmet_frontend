import Image from "next/image"
import mesasIcone from "@/assets/images/mesasIcone.svg"
import lixoIcone from '@/assets/images/lixo.svg'
import { setupAPIClient } from "@/services/api"
import { useState } from "react";

interface OrdersProps {
    id: string,
    name?: string,
    table: number | string,
    status: boolean,
    draft: boolean,
}

interface mesasProps {
    allOrders: OrdersProps[];
}

export default function TableCard({ allOrders }: mesasProps) {

    const [tableList, setTableList] = useState(allOrders || []);
    
    const aguardando = "bg-yellow-gourmet w-3 rounded-l-md"
    const atendidos = "bg-purple-gourmet w-3 rounded-l-md"

    const handleDelete = async (order_id: string) => {
        const apiClient = setupAPIClient();
        await apiClient.delete('/order', {
            params: {
                order_id
            }
        })
        
        const updatedTableList = tableList.filter(order => order.id !== order_id);
        setTableList(updatedTableList);
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tableList.map(order => (
                <div className="w-full" key={order.id}>
                <div className="bg-white w-full flex border rounded-md">
                    
                    <div className="w-full flex flex-[3]">
                    <div className={`${order.status == true ? atendidos : aguardando}`}></div>
                    <div className="flex gap-6 w-full ml-2 p-3 md:p-4 font-medium">
                        <Image src={mesasIcone} className="w-[30px]" alt="Mesa"/>
                        <p className="">Mesa {order.table}</p>
                    </div>
                    </div>
                    
                    <div className="flex-[1] flex items-center justify-end">
                        <button onClick={() => handleDelete(order.id)}>
                            <Image 
                                src={lixoIcone} 
                                className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] mr-4 hover:opacity-60
                                transition-all duration-300 ease-in-out" 
                                alt="Lixeira"
                            />
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}