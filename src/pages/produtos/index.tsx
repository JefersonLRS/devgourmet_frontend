import { canSSRAuth } from "@/utils/canSSRAuth"
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import produtosIcone from '@/assets/images/produtosIcone.svg';
import TitleCard from "@/components/TitleCard";
import uploadIcone from '@/assets/images/uploadIcone.svg';
import Image from 'next/image';
import { storage } from "@/services/storage/firebaseConnection";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { setupAPIClient } from "@/services/api";

interface CategoriesProps {
    categoryList: {
        id: number;
        name: string;
    }[]
}


export default function produtos( categoryList: CategoriesProps ) {


    const [isMobile, setIsMobile] = useState(false);
    const [preview, setPreview] = useState<File | null | string>(null);

    const [produto, setProduto] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState(categoryList || []);
    const [selectedCategory, setSelectedCategory] = useState(0);

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

    async function handleUpload(image: File) {
        const storageRef = ref(storage, `images/${image.name}`);

        await uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
            })
        })
    }

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0]

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            await setPreview(image);
        } else {
            toast.error('Tipo de arquivo não suportado, envie uma imagem do tipo PNG ou JPEG');
            return;
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        try {
            const data = new FormData();

            if (!preview) {
                toast.error('Selecione uma imagem para o produto');
                return;
            }
    
            if (!produto || !price || !description) {
                toast.error('Preencha todos os campos');
                return;
            }

            data.append('name', produto);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', String(categories.categoryList[selectedCategory].id));
            data.append('file', preview);

            const api = setupAPIClient();
            await api.post('/product', data);
            handleUpload(preview as File);
            toast.success('Produto cadastrado com sucesso');

            setProduto('');
            setPrice('');
            setDescription('');
            setPreview(null);
        }
        catch(err) {
            console.log(err);
            toast.error('Erro ao cadastrar produto');
        }
    }

    return (
        <div>
            <Head><title>Produtos - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={produtosIcone}
                        title="Produtos"
                    />
                    <div className="w-full bg-white h-[485px] md:h-[550px] rounded-md shadow-lg p-4 md:p-6">
                        <form className="flex flex-col w-full justify-between h-full gap-3" onSubmit={handleSubmit}>
                            <label className="flex flex-col justify-center bg-grey-gourmet items-center rounded-md w-full h-[80px] md:h-[150px]">
                                <span className="absolute z-30">
                                    <Image
                                        src={uploadIcone}
                                        alt="Upload icone"
                                        className="cursor-pointer hover:opacity-70 hover:scale-125
                                        transition duration-300 ease-in-out"
                                    />
                                </span>
                                <input 
                                    className="hidden absolute p-8" 
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    onChange={handleFile}
                                />
                                {preview && (
                                    <img 
                                        src={typeof preview === 'string' ? preview : URL.createObjectURL(preview)} 
                                        alt="Foto do produto"
                                        className="w-full h-full object-cover rounded-md" 
                                    />
                                )}
                            </label>
                            <select
                              className="outline-none p-4 bg-grey-gourmet rounded-md"
                              onChange={(e) => setSelectedCategory(Number(e.target.value))}
                              defaultValue="default"
                            >
                                <option value="default" disabled>Selecione uma categoria</option>
                                {categories.categoryList.map((category, index) => (
                                    <option key={category.id} value={index}>{category.name}</option>
                                ))}
                            </select>
                            <input 
                                type="text"
                                placeholder="Nome do produto..."
                                className="outline-none bg-grey-gourmet p-4 rounded-md"
                                value={produto}
                                onChange={(e) => setProduto(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Preço do produto..."
                                className="outline-none bg-grey-gourmet p-4 rounded-md"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <textarea
                                placeholder="Descrição do produto"
                                className="outline-none bg-grey-gourmet p-4 rounded-md h-[150px] resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>

                            <button className="p-4 bg-yellow-gourmet rounded-md hover:bg-yellow-300 transition-all duration-300 ease-in-out" type="submit">Cadastrar produto</button>
                        </form>
                    </div>
                </main>
            </Layout>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (context) => {

    const api = setupAPIClient(context);
    const response = await api.get('/category');

    return {
      props: {
        categoryList: response.data
      }
    }
})