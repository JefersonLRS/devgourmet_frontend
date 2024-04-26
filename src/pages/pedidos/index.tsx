import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState, useContext } from "react";
import Layout from "@/components/Layout";

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
        <Layout>
            <div>
                <h1 className="text-2xl">Pedidos!</h1>
            </div>
        </Layout>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {
    return {
      props: {}
    }
})