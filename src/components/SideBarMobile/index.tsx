import Image from "next/image";
import logo from '@/assets/images/logo.svg'
import Link from "next/link";
import { usePathname } from "next/navigation";

import pedidosIcone from '@/assets/images/pedidosIcone.svg'
import categoriasIcone from '@/assets/images/categoriasIcone.svg'
import produtosIcone from '@/assets/images/produtosIcone.svg'
import mesasIcone from '@/assets/images/mesasIcone.svg'
import sairIcone from '@/assets/images/sairIcone.svg'

export default function SideBarMobile() {

    const pathname = usePathname();

    const current = 'flex flex-col items-center justify-center text-sm gap-1 opacity-100'
    const general = 'flex flex-col items-center justify-center text-sm gap-1 opacity-40 hover:opacity-100 transition-all duration-300 ease-in-out'


    return (
        <div className="w-full h-screen">
        <div className="w-full bg-purple-gourmet p-4 flex justify-center">
            <Image src={logo} alt="Logo"/>
        </div>
        <nav>
            <ul className="flex items-center justify-between p-5 bg-white">
                <li>
                    <Link href='/pedidos' className={(pathname == '/pedidos') ? current : general}>
                        <Image className="w-[20px]" src={pedidosIcone} alt="pedidos"/>
                        <p>Pedidos</p>
                    </Link>
                </li>
                <li>
                    <Link href='/categorias' className={(pathname == '/categorias') ? current : general}>
                        <Image className="w-[20px]" src={categoriasIcone} alt="categorias"/>
                        <p>Categorias</p>
                    </Link>
                </li>
                <li>
                    <Link href='/produtos' className={(pathname == '/produtos') ? current : general}>
                        <Image className="w-[20px]" src={produtosIcone} alt="produtos"/>
                        <p>Produtos</p>
                    </Link>
                </li>
                <li>
                    <Link href='/mesas' className={(pathname == '/mesas') ? current : general}>
                        <Image className="w-[33px]" src={mesasIcone} alt="mesas"/>
                        <p>Mesas</p>
                    </Link>
                </li>
            </ul>
        </nav>
        </div>
  );
}