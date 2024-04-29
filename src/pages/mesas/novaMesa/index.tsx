import { canSSRAuth } from "@/utils/canSSRAuth"
import { FormEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TitleCard from "@/components/TitleCard";
import categoriasIcone from '@/assets/images/categoriasIcone.svg';
import editIcon from '@/assets/images/edit.svg';
import Image from "next/image";
import checkIcone from '@/assets/images/check.svg';
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import Router from "next/router";

export default function novaMesa() {

    const [isMobile, setIsMobile] = useState(false);
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (parseInt(table) === null || parseInt(table) === undefined) {
            toast.error('Digite o número da mesa');
            return;
        }

        const apiClient = setupAPIClient();
        apiClient.post('/order', {
            name: client,
            table: parseInt(table)
        })
        .then(() => {
            toast.success(`Mesa ${table} aberta com sucesso`);
            setClient('');
            setTable('');
        })
        .catch((error: any) => {
            console.log(error.response.data);
            toast.error(error.response.data.error);
            setClient('');
            setTable('');
        })
    }

    return (
        <div>
            <Head><title>Nova mesa - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={categoriasIcone}
                        title="Nova mesa"
                    />

                    <div className="w-full bg-white h-[485px] md:h-[550px] rounded-md shadow-lg p-4 md:p-6">
                        <form onSubmit={handleSubmit} className="flex w-full h-full flex-col justify-between">
                        {!isMobile && (
                            <div className="flex mb-5 gap-5 justify-start items-center opacity-60">
                                <h1 className="text-4xl font-extrabold">Nova Mesa</h1>
                                <Image src={editIcon} alt="Icone"/>
                            </div>
                        )}
                            
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="number"
                                        className="bg-input-color w-full p-4 outline-none rounded-md"
                                        placeholder="Nº da mesa"
                                        value={table}
                                        onChange={e => setTable(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="bg-input-color w-full p-4 outline-none rounded-md"
                                        placeholder="Nome do cliente"
                                        value={client}
                                        onChange={e => setClient(e.target.value)}
                                    />
                                </div>
                                <div className="flex">
                                    <div className="w-full flex gap-2 md:gap-4">
                                        <button 
                                        className="flex w-full gap-3 justify-center items-center bg-transparent
                                        border-[#636363] border md:border-[2px] p-3 md:p-4 rounded-md hover:bg-gray-100 
                                        transition-all duration-300"
                                        onClick={() => Router.push('/mesas')}
                                        type="button"
                                        >
                                            <p>Cancelar</p>
                                        </button>
                                        <button 
                                        className="flex w-full gap-3 justify-center items-center bg-yellow-gourmet
                                        text-[#302B14] p-3 md:p-4 rounded-md hover:bg-yellow-200 transition-all 
                                        duration-300"
                                        type="submit"
                                        onClick={handleSubmit}
                                        >
                                            <p>Abrir</p>
                                            <Image src={checkIcone} alt="Icone"/>
                                        </button>
                                    </div>
                                </div>
                            </div>                            
                        </form>
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