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
                        <div className="w-full my-3" key={order.id}>
                            <div className="bg-white w-full flex">
                                <div className="bg-yellow-gourmet w-3"></div>
                                <div className="flex gap-6 ml-2 p-4">
                                    <Image src={mesasIcone} className="w-[30px]" alt="Mesa"/>
                                    <p>Mesa {order.table}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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