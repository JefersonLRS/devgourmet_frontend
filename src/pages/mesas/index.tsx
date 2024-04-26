import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TitleCard from "@/components/TitleCard";
import mesasIcone from '@/assets/images/mesasIcone.svg';

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
                <main>
                    <TitleCard
                        icon={mesasIcone}
                        title="Mesas"
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