import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function categorias() {

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
            <Head><title>Categorias - DevGourmet</title></Head>
            <Layout>
                <div>
                    <h1 className="text-2xl">Categorias!</h1>
                </div>
            </Layout>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
      props: {}
    }
})