import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TitleCard from "@/components/TitleCard";
import mesasIcone from '@/assets/images/mesasIcone.svg';
import editIcon from '@/assets/images/edit.svg';
import Image from "next/image";

export default function mesas() {

    const [isMobile, setIsMobile] = useState(false);

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
            <Head><title>Mesas - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={mesasIcone}
                        title="Mesas"
                    />
                    <div className="w-full bg-white h-[485px] md:h-[550px] rounded-md shadow-lg p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="w-full">
                                {!isMobile && (
                                    <div className="flex mb-5 gap-5 justify-start items-center opacity-60">
                                        <h1 className="text-4xl font-extrabold">Mesas</h1>
                                        <Image src={editIcon} alt="Icone"/>
                                    </div>
                                )}
                                <div className="flex gap-2 w-full">
                                    <div className="bg-yellow-gourmet w-full py-2 md:w-auto px-5 text-[10px] md:text-sm flex justify-center items-center rounded-md">
                                        <p>Aguardando pedido</p>    
                                    </div>    
                                    <div className="bg-purple-gourmet w-full py-2 md:w-auto px-5 text-[10px] md:text-sm text-white flex justify-center items-center rounded-md">
                                        <p>Atendidos</p>    
                                    </div>    
                                </div>
                            </div>
                            
                            {!isMobile && (
                                <div className="flex gap-3 w-full justify-end">
                                    <div className="bg-dark-gourmet text-white px-6 py-3 rounded-md
                                    flex justify-center items-center">
                                        <p>Fechar mesa</p>
                                    </div>
                                    <div className="bg-purple-gourmet text-white px-6 py-3 rounded-md
                                    flex justify-center items-center">
                                        <p>Nova mesa</p>
                                    </div>
                                </div>
                            )}    
                            
                        </div>
                        <div>
                            {/* Mesas */}
                        </div>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
      props: {}
    }
})