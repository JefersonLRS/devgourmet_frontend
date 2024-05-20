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
    amount: number,
    name?: string,
    order_id: string,
    table: number | string,
    status: boolean,
    draft: boolean,
    product_id?: string,
    product: {
        name: string,
        price: number,
    },
    order?: {
        table?: number | string,
    }
}

interface ModalProps {

    orderProp: {
        order_id: string,
    },    
    amount: number,
    id: string,
    order: {
        table: number | string,
    },
    order_id: string,
    product: {
        name: string,
        price: number,
    },
    product_id: string,
    
}

interface PedidosProps {
    orders: OrdersProps[];
}

export default function pedidos({ orders }: PedidosProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [orderList, setOrderList] = useState(orders || []);
    const [currentOrder, setCurrentOrder] = useState([] as ModalProps[]);
    const [currentTable, setCurrentTable] = useState(0);
    const [showModal, setShowModal] = useState(false);

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

    async function handleOpenModal(id: string) {        
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/order/findItems', {
            params: {
                order_id: id
            }
        })
        console.log(response.data);
        const tableList = response.data[0].order.table
        setCurrentTable(tableList);
        const currentOrderData = response.data;
        setCurrentOrder(currentOrderData);
        setShowModal(true);
    }

    async function handleOrderSent(id: string) {
        const apiClient = setupAPIClient();
        const response = await apiClient.put('/order/finish', {
            order_id: id
        });
        setShowModal(false);
        const newOrderList = orderList.filter(order => order.id !== id);
        setOrderList(newOrderList);
        return response;
    }

    return (
        <div>
        <Head><title>Pedidos - DevGourmet</title></Head>
            {showModal && currentOrder.length > 0 && (                    
                
                <div className="w-full h-full absolute z-50 flex justify-center items-center px-6 bg-black bg-opacity-50">
                <div className="w-full rounded-2xl shadow-modal h-[500px]
                md:w-[700px] md:h-[500px] bg-white flex flex-col justify-between p-5 md:p-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">Mesa {currentTable}</h2>
                    </div>
                {/* PRECISO LISTAR A QUANTIDADE, PRODUTO E PREÇO */}
                    <div className="w-full h-[300px] overflow-auto text-sm md:text-base">
                        {currentOrder.map((item, index) => (
                            <div className="w-full flex flex-col" key={index}>
                                <div className="flex w-full items-center justify-between py-4">
                                    <div className="flex gap-3">
                                        <p>{item.amount}</p>
                                        <p>{item.product.name}</p>
                                    </div>
                                    <div>
                                        <p>R${item.product.price}</p>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-slate-200"></div>
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full gap-3">
                        <button 
                        className="w-full p-3 border border-dark-gourmet text-dark-gourmet
                        rounded-md"
                        onClick={() => setShowModal(false)}
                        >
                            Fechar
                        </button>
                        <button className="w-full p-3 bg-purple-gourmet text-white
                            rounded-md"
                        onClick={() => handleOrderSent(currentOrder[0].order_id)}
                        >
                            Entregue
                        </button>
                    </div>
                </div>
                </div> 
                
            )}
        <Layout>
            <main className="flex flex-col gap-3 md:gap-5">
                <TitleCard
                    icon={pedidosIcone}
                    title="Pedidos"
                />
            
                <div>
                    {orderList.length > 0 ? (
                        <div  className="h-[350px] overflow-auto">
                            <div className="flex flex-col gap-3">
                                {orderList.map( (order, index) => (
                                    <button onClick={() => handleOpenModal(order.id)} key={index}>
                                        <OrderCard
                                        table={order.table}
                                        status={order.status}
                                    />
                                    </button>
                                ))}
                            </div>
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