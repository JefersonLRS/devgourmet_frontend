import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import pedidosIcone from '@/assets/images/pedidosIcone.svg';
import TitleCard from "@/components/TitleCard";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import Image from "next/image";
import mesasIcone from '@/assets/images/mesasIcone.svg';
import OrderCard from "@/components/OrderCard";
import Link from "next/link";
import Plus from '@/assets/images/plus.svg';

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
            <main>
                <TitleCard
                    icon={pedidosIcone}
                    title="Pedidos"
                />
                <div>
                    {orderList.map( order => (
                        <OrderCard
                            key={order.id}
                            table={order.table}
                        />
                    ))}
                </div>
                
                <div className="bg-yellow-gourmet rounded-full w-[60px] h-[60px] flex justify-center 
                items-center absolute bottom-0 right-0 m-3 md:w-[80px] md:h-[80px]
                hover:bg-yellow-200 transition duration-300 ease-in-out
                ">
                    <Link className="w-full h-full flex justify-center items-center" href='/pedidos/new'>
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