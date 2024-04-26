import { useState, useContext } from "react";
import logo from '@/assets/images/logo.svg'
import Image from "next/image";
import { AuthContext } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

import pedidosIcone from '@/assets/images/pedidosIcone.svg'
import categoriasIcone from '@/assets/images/categoriasIcone.svg'
import produtosIcone from '@/assets/images/produtosIcone.svg'
import mesasIcone from '@/assets/images/mesasIcone.svg'
import sairIcone from '@/assets/images/sairIcone.svg'
import Link from "next/link";

export default function SideBar () {

    const { signOut } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    const current = 'flex gap-8 items-center opacity-100'
    const general = 'flex gap-8 items-center opacity-40 hover:opacity-100 transition-all duration-300 ease-in-out'

    return (
        <div className="w-[300px] h-screen bg-white flex flex-col p-6 items-center justify-between">
                <div>
                    <Image src={logo} alt="logo"/>
                </div>
                <nav>
                    <ul className="flex flex-col gap-7 text-lg font-medium">
                        <li>
                            <Link href='/pedidos' className={(pathname == '/pedidos') ? current : general}>
                                <Image className="w-[25px]" src={pedidosIcone} alt="pedidos"/>
                                <p>Pedidos</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='/categorias' className={(pathname == '/categorias') ? current : general}>
                                <Image className="w-[25px]" src={categoriasIcone} alt="categorias"/>
                                <p>Categorias</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='/produtos' className={(pathname == '/produtos') ? current : general}>
                                <Image className="w-[25px]" src={produtosIcone} alt="produtos"/>
                                <p>Produtos</p>
                            </Link>
                        </li>
                        <li>
                            <Link href='/mesas' className={(pathname == '/mesas') ? current : general}>
                                <Image className="w-[25px]" src={mesasIcone} alt="mesas"/>
                                <p>Mesas</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                <div>
                    <button onClick={signOut} className="flex gap-8 items-center text-lg justify-start font-medium
                     opacity-40 hover:opacity-100 transition-all ease-in-out duration-300">
                        <Image className="w-[25px]" src={sairIcone} alt="sair"/>
                        <p>Sair</p>
                    </button>
                </div>
                
            </div>
    )
}