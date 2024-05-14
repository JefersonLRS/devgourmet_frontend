import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import pedidosIcone from '@/assets/images/pedidosIcone.svg';
import TitleCard from "@/components/TitleCard";
import { setupAPIClient } from "@/services/api";
import Image from "next/image";
import OrderCard from "@/components/OrderCard";
import Link from "next/link";
import Plus from '@/assets/images/plus.svg';
import avatar from '@/assets/images/avatar.svg';

type OrdersProps = {
    id: string,
    name?: string,
    table: number | string,
    status: boolean,
    draft: boolean,
}

interface PedidosProps {
    orders: OrdersProps[];
}

export default function pedidos({ orders }: PedidosProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [orderList, setOrderList] = useState(orders || []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div>
        <Head><title>Pedidos - DevGourmet</title></Head>
        <Layout>
            <main className="flex flex-col gap-3 md:gap-5">
                <TitleCard
                    icon={pedidosIcone}
                    title="Pedidos"
                />
            
                <div className="h-[350px] overflow-auto">
                    {orderList.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {orderList.map( (order, index) => (
                                <div key={index}>
                                    <OrderCard
                                    table={order.table}
                                />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-[100px] md:mt-[200px]">
                            <Image className="w-[50%] md:w-[20%]" src={avatar} alt="Avatar" />
                            <p className="text-gray-400 text-lg mt-5">Nenhum pedido encontrado</p>
                        </div>
                    )}
                </div>
                
                <div className="bg-yellow-gourmet rounded-full w-[60px] h-[60px] flex justify-center 
                items-center absolute bottom-0 right-0 m-3 md:w-[80px] md:h-[80px]
                hover:bg-yellow-200 transition duration-300 ease-in-out
                ">
                    <Link className="w-full h-full flex justify-center items-center" href='/pedidos/novoPedido'>
                        <Image src={Plus} alt="Adicionar novo pedido"/>
                    </Link>
                </div>
                
            </main>
        </Layout>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context)

    const response = await apiClient.get('/orders')

    return {
      props: {
        orders: response.data
      }
    }
})