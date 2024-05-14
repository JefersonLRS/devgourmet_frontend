import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TitleCard from "@/components/TitleCard";
import mesasIcone from '@/assets/images/mesasIcone.svg';
import editIcon from '@/assets/images/edit.svg';
import Image from "next/image";
import { setupAPIClient } from "@/services/api";
import TableCard from "@/components/TableCard";
import Link from "next/link";

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

export default function mesas({ allOrders }: mesasProps) {

    const [isMobile, setIsMobile] = useState(false);
    const [tableList, setTableList] = useState(allOrders || []);

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

    useEffect(() => {
        setTableList(allOrders)
    }, [tableList])

    return (
        <div>
            <Head><title>Mesas - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={mesasIcone}
                        title="Mesas"
                    />
                    <div className={`${!isMobile ? "w-full bg-white h-[485px] md:h-[550px] flex flex-col gap-5 rounded-md shadow-lg p-4 md:p-6" 
                    : "w-full bg-white h-[485px] md:h-[550px] flex flex-col justify-between rounded-md shadow-lg p-4 md:p-6"}`}>
                        <div className="flex items-center justify-between">
                            <div className="w-full flex flex-col gap-2 md:gap-0">
                                {!isMobile && (
                                    <div className="flex mb-5 gap-5 justify-start items-center opacity-60">
                                        <h1 className="text-4xl font-extrabold">Mesas</h1>
                                        <Image src={editIcon} alt="Icone"/>
                                    </div>
                                )}
                                <div className="flex gap-2 w-full">
                                    <div className="bg-yellow-gourmet w-full py-2 md:w-auto px-5 text-[10px] md:text-sm flex justify-center items-center rounded-md">
                                        <p>Aguardando</p>    
                                    </div>    
                                    <div className="bg-purple-gourmet w-full py-2 md:w-auto px-5 text-[10px] md:text-sm text-white flex justify-center items-center rounded-md">
                                        <p>Atendidos</p>    
                                    </div>    
                                </div>
                                {isMobile && (
                                <div className="h-[330px] mt-3 overflow-auto">
                                    { tableList.length > 0 ? (
                                        <div className="w-full">
                                            <TableCard
                                                allOrders={tableList}
                                            />
                                        </div>
                                    ) : (
                                    <div className="flex flex-col items-center opacity-30 justify-center mt-[100px]">
                                        <Image className="w-[50%] md:w-[20%]" src={mesasIcone} alt="Mesas" />
                                        <p className="text-black text-lg mt-5">Nenhuma mesa aberta</p>
                                    </div>
                                    )}
                                </div>
                            )}
                            </div>
                            
                            {!isMobile && (
                                <div className="flex gap-2 w-full justify-end">
                                    <Link href='/mesas/novaMesa' className="bg-purple-gourmet text-white px-6 py-3 rounded-md
                                    flex justify-center items-center hover:bg-purple-400 transition-all duration-300">
                                        <p>Nova mesa</p>
                                    </Link>
                                </div>
                            )}    
                            
                        </div>
                        <div>
                            {!isMobile && (
                                <div className="h-[380px] overflow-auto">
                                    { tableList.length > 0 ? (
                                        <div className="w-full">
                                           <TableCard
                                                allOrders={tableList}
                                            />
                                        </div>
                                    ) : (
                                    <div className="flex flex-col items-center opacity-30 justify-center mt-[100px]">
                                        <Image className="w-[50%] md:w-[20%]" src={mesasIcone} alt="Mesas" />
                                        <p className="text-black text-lg mt-5">Nenhuma mesa aberta</p>
                                    </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            {isMobile && (
                                <div className="flex gap-2 w-full text-sm">
                                    <Link href='/mesas/novaMesa' className="bg-purple-gourmet text-white px-6 py-3 rounded-md
                                    flex justify-center items-center w-full hover:bg-purple-400 transition-all duration-300">
                                        <p>Nova mesa</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const apiClient = setupAPIClient(context)
    const response = await apiClient.get('/allOrders')

    return {
      props: {
        allOrders: response.data
      }
    }
})