import Head from "next/head";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from "@/components/Input";

export default function signup () {


  const { signUp } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    email: z.string().email('E-mail inválido').min(1, 'Campo obrigatório'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
  })

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
        await signUp(data)
        reset();
    setIsLoading(false)
  }


    return (
        <>
        <Head>
            <title>DevGourmet - Faça seu Cadastro</title>
        </Head>
        <main className="bg-[#E9E9E9] flex flex-col justify-center items-center h-screen">
        <Image className="w-[80%] md:w-[30%]" src={logo} alt="Logo" />
        <div className="w-full flex justify-center items-center flex-col">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full p-6 md:w-[40%] gap-3">
            <Input
                type="text"
                placeholder="Digite seu nome..."
                name="name"
                error={errors.name?.message}
                register={register}
            />
            <Input
                type="text"
                placeholder="Digite seu e-mail..."
                name="email"
                error={errors.email?.message}
                register={register}
            />
            <Input
                type="password"
                placeholder="Digite sua senha..."
                name="password"
                error={errors.password?.message}
                register={register}
            />
            <button className="flex items-center justify-center gap-3 text-white bg-yellow-gourmet p-3 rounded-md shadow-lg">
            {!isLoading ? (
              <>
                <p className="text-lg font-medium">Cadastrar</p>
                <FaArrowRightLong/>
              </>
            ) : (
                <p className="text-lg font-medium">Carregando...</p>
            ) }
          </button>
            </form>
            <p><span className="opacity-70">Já possui uma conta?</span> <Link href="/">Faça Login</Link></p>
        </div>
    </main>
        </>
    )
}