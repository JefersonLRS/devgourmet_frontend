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

export default function categorias() {

    const [isMobile, setIsMobile] = useState(false);
    const [category, setCategory] = useState('');

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

        if (category === '') {
            toast.error('Preencha o campo de categoria');
            return;
        }

        const apiClient = setupAPIClient();
        apiClient.post('/category', {
            name: category
        })
        .then(() => {
            toast.success('Categoria cadastrada com sucesso');
            setCategory('');
        })
        .catch(() => {
            toast.error('Erro ao cadastrar categoria');
        })
    }

    return (
        <div>
            <Head><title>Categorias - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={categoriasIcone}
                        title="Nova categoria"
                    />

                    <div className="w-full bg-white h-[485px] md:h-[550px] rounded-md shadow-lg p-4 md:p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
                            <div>
                                {!isMobile && (
                                    <div className="flex mb-5 gap-5 justify-start items-center opacity-60">
                                        <h1 className="text-4xl font-extrabold">Nova Categoria</h1>
                                        <Image src={editIcon} alt="Icone"/>
                                    </div>
                                )}
                                
                                <input
                                    type="text"
                                    className="bg-input-color w-full p-4 outline-none rounded-md"
                                    placeholder="Nova categoria"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </div>

                            <button className="flex gap-3 justify-center items-center bg-yellow-gourmet
                            text-[#302B14] p-4 rounded-md">
                                <p>Cadastrar Categoria</p>
                                <Image src={checkIcone} alt="Icone"/>
                            </button>
                            
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