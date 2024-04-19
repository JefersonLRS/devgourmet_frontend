import Head from "next/head";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";


export default function signup () {
    return (
        <>
        <Head>
            <title>DevGourmet - Faça seu Cadastro</title>
        </Head>
        <main className="bg-[#E9E9E9] flex flex-col justify-center items-center h-screen">
        <Image className="w-[80%] md:w-[30%]" src={logo} alt="Logo" />
        <div className="w-full flex justify-center items-center flex-col">
            <form className="flex flex-col w-full p-6 md:w-[40%] gap-3">
            <input
                type="text"
                className="p-3 rounded-md"
                placeholder="Digite seu nome..."
            />
            <input
                type="text"
                className="p-3 rounded-md"
                placeholder="Digite seu e-mail..."
            />
            <input
                type="password"
                className="p-3 rounded-md"
                placeholder="Digite sua senha..."
            />
            <button className="flex items-center justify-center gap-3 text-white bg-yellow-gourmet p-3 rounded-md shadow-lg">
                <p className="text-lg font-medium">Cadastrar</p>
                <FaArrowRightLong/>
            </button>
            </form>
            <p><span className="opacity-70">Já possui uma conta?</span> <Link href="/signup">Faça Login</Link></p>
        </div>
    </main>
        </>
    )
}