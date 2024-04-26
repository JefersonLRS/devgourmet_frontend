import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import pedidosIcone from '@/assets/images/pedidosIcone.svg';
import TitleCard from "@/components/TitleCard";

export default function pedidos() {

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
        <Head><title>Pedidos - DevGourmet</title></Head>
        <Layout>
            <main>
                <TitleCard
                    icon={pedidosIcone}
                    title="Pedidos"
                />
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