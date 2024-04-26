import Image from "next/image";
import logo from '@/assets/images/logo.svg'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import pedidosIcone from '@/assets/images/pedidosIcone.svg'
import categoriasIcone from '@/assets/images/categoriasIcone.svg'
import produtosIcone from '@/assets/images/produtosIcone.svg'
import mesasIcone from '@/assets/images/mesasIcone.svg'
import sairIcone from '@/assets/images/sairIcone.svg'

export default function SideBarMobile() {

    const pathname = usePathname();
    const { signOut } = useContext(AuthContext);

    const current = 'flex flex-col items-center justify-center text-sm gap-1 opacity-100'
    const general = 'flex flex-col items-center justify-center text-sm gap-1 opacity-40 hover:opacity-100 transition-all duration-300 ease-in-out'


    return (
        <div className="w-full">
        <div className="w-full bg-purple-gourmet flex p-3 justify-between">
            <Image src={logo} className="max-w-[250px]" alt="Logo"/>
            <button onClick={signOut} className="pr-2 opacity-60">
                <Image className="w-[25px]" src={sairIcone} alt="sair"/>
            </button>
        </div>
        <nav>
            <ul className="flex items-center justify-between p-5 bg-white">
                <li>
                    <Link href='/pedidos' className={(pathname == '/pedidos') ? current : general}>
                        <Image className="w-[15px]" src={pedidosIcone} alt="pedidos"/>
                        <p>Pedidos</p>
                    </Link>
                </li>
                <li>
                    <Link href='/categorias' className={(pathname == '/categorias') ? current : general}>
                        <Image className="w-[15px]" src={categoriasIcone} alt="categorias"/>
                        <p>Categorias</p>
                    </Link>
                </li>
                <li>
                    <Link href='/produtos' className={(pathname == '/produtos') ? current : general}>
                        <Image className="w-[15px]" src={produtosIcone} alt="produtos"/>
                        <p>Produtos</p>
                    </Link>
                </li>
                <li>
                    <Link href='/mesas' className={(pathname == '/mesas') ? current : general}>
                        <Image className="w-[20px]" src={mesasIcone} alt="mesas"/>
                        <p>Mesas</p>
                    </Link>
                </li>
            </ul>
        </nav>
        </div>
  );
}