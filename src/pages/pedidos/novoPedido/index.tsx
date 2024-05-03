import { canSSRAuth } from "@/utils/canSSRAuth"
import { FormEvent, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import TitleCard from "@/components/TitleCard";
import categoriasIcone from '@/assets/images/categoriasIcone.svg';
import editIcon from '@/assets/images/edit.svg';
import Image from "next/image";
import checkIcone from '@/assets/images/check.svg';
import plusIcon from '@/assets/images/plus.svg';
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import Link from "next/link";
import DraftOrderCard from "@/components/DraftOrderCard";

interface CategoriesProps {
    categoryList: {
        id: number;
        name: string;
    }[]
}

interface ProductsProps {
    id: string;
    name: string;
    price: number;
    category_id: number;
}

export default function novoPedido( categoryList: CategoriesProps ) {

    const [isMobile, setIsMobile] = useState(false);
    
    const [table, setTable] = useState('');
    const [categories, setCategories] = useState(categoryList || []);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [quantity, setQuantity] = useState('');
    
    const [idMesa, setIdMesa] = useState('');
    const [productId, setProductId] = useState('');
    const [quantityProduct, setQuantityProduct] = useState(0);

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

    const handleSelectCategory = async (e: FormEvent<HTMLSelectElement>) => {
        const index = parseInt(e.currentTarget.value);
        setSelectedCategory(index);
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/category/product', {
                params: {
                    category_id: categories.categoryList[index].id
                }
            })
            setProducts(response.data as ProductsProps[]);
            return response.data;
        } catch (error) {
            console.log("erro ao buscar produtos", error);
        }
    }

    const getDraftOrders = async (table: string) => {
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/order/find', {
                params: {
                    table: parseInt(table),
                }
            })
            return response.data.id as string;
        } catch (error) {
            console.log("erro ao buscar pedido", error);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const idDaMesa = await getDraftOrders(table);
        const productId = products[selectedProduct].id;
        const quantityProduct = parseInt(quantity);

        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/order/item', {
                
                order_id: idDaMesa,
                product_id: productId,
                amount: quantityProduct
                
            })
            setIdMesa(idDaMesa as string);
            setProductId(products[selectedProduct].id);
            setQuantityProduct(parseInt(quantity));
        }
        catch (error) {
            console.log("erro ao adicionar produto", error);
        }

        setTable('');
        setSelectedProduct(0);
        setQuantity('');
        setSelectedCategory(0);
    }

    return (
        <div>
            <Head><title>Novo pedido - DevGourmet</title></Head>
            <Layout>
                <main className="flex flex-col gap-3 md:gap-5">
                    <TitleCard
                        icon={categoriasIcone}
                        title="Novo pedido"
                    />

                    <div className="w-full bg-white h-[485px] md:h-[550px] rounded-md shadow-lg p-4 md:p-6">
                        {!isMobile && (
                            <div className="flex justify-between items-center">
                                <div className="flex mb-5 gap-5 justify-start items-center opacity-60">
                                    <h1 className="text-4xl font-extrabold">Novo Pedido</h1>
                                    <Image src={editIcon} alt="Icone"/>
                                </div>
                                <Link href='/mesas/novaMesa' className="bg-purple-gourmet text-white px-6 py-3 rounded-md
                                flex justify-center items-center hover:bg-purple-400 transition-all duration-300">
                                    <p>Nova mesa</p>
                                </Link>
                            </div>
                        )}
                        {isMobile && (
                            <div className="flex flex-col gap-3">
                                <Link href='/mesas/novaMesa' className="bg-purple-gourmet text-white px-6 py-3 rounded-md
                                flex justify-center items-center hover:bg-purple-400 transition-all duration-300">
                                    <p>Abrir nova mesa</p>
                                </Link>
                                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                                    <div className="flex gap-3">
                                        <input
                                            className="w-full bg-input-color p-3 rounded-md"
                                            type="number"
                                            placeholder="Nº da mesa..."
                                            value={table}
                                            onChange={e => setTable(e.target.value)}
                                        />
                                        <select 
                                            className="w-full bg-input-color p-3 rounded-md"
                                            defaultValue="default"
                                            onChange={handleSelectCategory}
                                        >
                                            <option value="default" disabled>Categoria</option>
                                            {categories.categoryList.map((category, index) => (
                                                <option key={category.id} value={index}>{category.name}</option>
                                            ))}

                                        </select>
                                    </div>
                                    <div>
                                        <select 
                                            className="w-full bg-input-color p-3 rounded-md"
                                            onChange={(e) => setSelectedProduct(Number(e.target.value))}
                                            defaultValue="default"
                                        >
                                            <option value="default" disabled>Selecione o produto</option>
                                            {/* LISTAR PRODUTOS */}
                                            {products.map((item, index) => (
                                                <option key={item.id} value={index}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-3">
                                        <input 
                                            type="number"
                                            className="w-full bg-input-color p-3 rounded-md"
                                            placeholder="Quantidade..."
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-purple-gourmet w-full text-white
                                            p-3 rounded-md flex items-center justify-center gap-2"
                                        >
                                            <p>Adicionar</p>
                                            <Image src={plusIcon} className="w-[10px] h-[10px]" alt="Icone"/>
                                        </button>
                                    </div>
                                </form>

                                <div>
                                    {/* LISTAR DRAFT PEDIDOS */}
                                    <DraftOrderCard
                                        table_id={idMesa}
                                        product={productId}
                                        quantity={quantityProduct}
                                    />
                                </div>

                                <div>
                                    {/* BOTÕES CANCELAR E FAZER PEDIDO */}
                                </div>
                            </div>
                        )}
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