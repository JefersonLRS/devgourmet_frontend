import Image from "next/image"
import mesasIcone from "@/assets/images/mesasIcone.svg"
import lixoIcone from '@/assets/images/lixo.svg'
import { setupAPIClient } from "@/services/api"
import { useEffect, useState } from "react";

interface DraftOrdersProps {
    id: string;
    table_id: string;
    product: string;
    quantity: number;
    handleDelete: (product_id: string) => void;
}

export default function DraftOrderCard({ id, table_id, product, quantity, handleDelete }: DraftOrdersProps) {
    
    const atendidos = "bg-purple-gourmet w-3 rounded-l-md";

    const [productName, setProductName] = useState('');

    useEffect(() => {

        async function getProductNameById(product: string) {
            const api = setupAPIClient();
            const response = await api.get('/product/find', {
                params: {
                    product_id: product
                }
            });
            const data = response.data.name;
            setProductName(data);
        }

        getProductNameById(product);
    }, [product]);

    return (
        <div className="flex flex-col">
                    <div className="w-full">
                    <div className="bg-white w-full flex border rounded-md">
                            <div className="w-full flex flex-[3]">
                                <div className={atendidos}></div>
                                <div className="flex gap-6 w-full ml-2 p-3 md:p-4 text-sm md:text-base font-medium">
                                    <p>{quantity}</p>
                                    <p>{productName}</p>
                                </div>
                            </div>
                            
                            <div className="flex-[1] flex items-center justify-end">
                                <button onClick={() => handleDelete(id)}>
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
        </div>
    )
}