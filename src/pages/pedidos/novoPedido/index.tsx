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
import lixoIcone from '@/assets/images/lixo.svg'
import DraftOrderCard from "@/components/DraftOrderCard";
import Router from "next/router";
import Avatar from '@/assets/images/avatar.svg'

interface CategoriesProps {
    categoryList: {
        id: number;
        name: string;
    }[]
}

interface OrdersProps {
    orderList: {
        id: string,
        table: number,
        status: boolean,
        draft: boolean,
        name?: string,
    }[]
}

interface ProductsProps {
    id: string;
    name: string;
    price: number;
    category_id: number;
}

interface DraftProps {
    id: string;
    order_id: string;
    product_id: string;
    amount: number;
}

export default function novoPedido( { categoryList, orderList }: { categoryList: CategoriesProps[], orderList: OrdersProps[] } ) {

    const [isMobile, setIsMobile] = useState(false);
    
    const [table, setTable] = useState('');
    
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categories, setCategories] = useState(categoryList || []);

    const [selectedTable, setSelectedTable] = useState(0);
    const [tableList, setTableList] = useState(orderList || []);
    
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [products, setProducts] = useState<ProductsProps[]>([]);
    
    const [orders, setOrders] = useState<DraftProps[]>([]);

    const [quantity, setQuantity] = useState('');
    
    const [productName, setProductName] = useState<String[]>()

    // AQUI SÃO OS ESTADOS QUE SERÃO ENVIADOS PARA O COMPONENTE DraftOrderCard
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

    const handleSelectOrder = async (e: FormEvent<HTMLSelectElement>) => {
        const index = (Number(e.currentTarget.value));
        setSelectedTable(index);
        const apiClient = setupAPIClient();
        console.log(index);
        
        try {
            const response = await apiClient.get('/order/findItems', {
                params: {
                    order_id: tableList[index].id
                }
            })
            console.log(response.data);
            setOrders(response.data as DraftProps[]);
        }
        catch (error) {
            console.log("erro ao buscar pedidos", error);
        }
    }

    const handleSelectCategory = async (e: FormEvent<HTMLSelectElement>) => {
        const index = (Number(e.currentTarget.value));
        const apiClient = setupAPIClient();
        try {
            const response = await apiClient.get('/category/product', {
                params: {
                    category_id: categories[index].id
                }
            })
            setSelectedCategory(index);
            setProducts(response.data as ProductsProps[]);
            return response.data;
        } catch (error) {
            console.log("erro ao buscar produtos", error);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const idDaMesa = tableList[selectedTable].id;
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
            console.log(idDaMesa);

            const newOrder = {
                id: idDaMesa,
                order_id: idDaMesa,
                product_id: productId,
                amount: quantityProduct
            }
            setOrders([...orders, newOrder])
        }
        catch (error) {
            console.log("erro ao adicionar produto", error);
        }

        setTable('');
        setSelectedProduct(0);
        setQuantity('');
        setSelectedCategory(0);
        setSelectedTable(0);

    }

    async function handleDelete(item_id: string) {
        const api = setupAPIClient();
        await api.delete('/order/remove', {
            params: {
                item_id
            }
        });
        const newOrders = orders.filter((order) => order.id !== item_id);
        setOrders(newOrders);
    }

    async function handleSendOrder() {
        const api = setupAPIClient();
        try {
            await api.put('/order/send', {
                order_id: idMesa
            })
            toast.success('Pedido enviado com sucesso');
            Router.push('/pedidos');
        }
        catch (error) {
            console.log("erro ao enviar pedido", error);
        }
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
                            <div className="flex flex-col justify-between h-full">
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

                                <div className="flex gap-3 h-[330px]">
                                    {/* CARDS E LISTA DE PEDIDOS */}
                                    <form className="flex h-full flex-col justify-between gap-3 w-full" onSubmit={handleSubmit}>
                                        <select
                                            className="w-full bg-input-color p-4 rounded-md"
                                            onChange={handleSelectOrder}
                                            defaultValue="default"
                                        >
                                            <option value="default" disabled>Mesa</option>
                                            {tableList.map((order, index) => (
                                                <option key={order.id} value={index}>{order.table}</option>
                                            ))}
                                        </select>
                                        <select 
                                            className="w-full bg-input-color p-4 rounded-md"
                                            defaultValue="default"
                                            onChange={handleSelectCategory}
                                        >
                                            <option value="default" disabled>Categoria</option>
                                            {categories.map((category, index) => (
                                                <option key={category.id} value={index}>{category.name}</option>
                                            ))}

                                        </select>
                                        <select 
                                            className="w-full bg-input-color p-4 rounded-md"
                                            onChange={(e) => setSelectedProduct(Number(e.target.value))}
                                            defaultValue="default"
                                        >
                                            <option value="default" disabled>Selecione o produto</option>
                                            {/* LISTAR PRODUTOS */}
                                            {products.map((item, index) => (
                                                <option key={item.id} value={index}>{item.name}</option>
                                            ))}
                                        </select>
                                        <input 
                                            type="number"
                                            className="w-full bg-input-color p-4 rounded-md"
                                            placeholder="Quantidade..."
                                            value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-purple-gourmet w-full text-white
                                            p-4 rounded-md flex items-center justify-center gap-2"
                                        >
                                            <p>Adicionar</p>
                                            <Image src={plusIcon} className="w-[10px] h-[10px]" alt="Icone"/>
                                        </button>
                                    </form>
                                    <div className="h-full overflow-auto w-full">
                                    {/* LISTAR DRAFT PEDIDOS */}
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <div key={index}>
                                                <DraftOrderCard
                                                    id={order.id}
                                                    table_id={order.order_id}
                                                    product={order.product_id}
                                                    quantity={order.amount}
                                                    handleDelete={() => handleDelete(order.id)}
                                                />
                                            </div>
                                        ))
                                    ): (
                                        <div className="w-full h-full opacity-60 flex flex-col justify-center items-center">
                                            <Image src={Avatar} alt="Avatar"/>
                                            <p>Ainda não há pedidos.</p>
                                        </div>
                                    )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {/* BOTÕES CANCELAR E FAZER PEDIDO */}
                                    <button
                                    className="w-full p-3 border border-gray-400 text-gray-400 rounded-md"
                                    onClick={() => Router.push('/pedidos')}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                    className="w-full p-3 bg-yellow-gourmet text-black rounded-md"
                                    onClick={handleSendOrder}
                                    >
                                        Fazer pedido
                                    </button>
                                </div>
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
                                        <select
                                            className="w-full bg-input-color p-3 rounded-md"
                                            onChange={handleSelectOrder}
                                            defaultValue="default"
                                        >
                                            <option value="default" disabled>Mesa</option>
                                            {tableList.map((order, index) => (
                                                <option key={order.id} value={index}>{order.table}</option>
                                            ))}
                                        </select>
                                        <select 
                                            className="w-full bg-input-color p-3 rounded-md"
                                            defaultValue="default"
                                            onChange={handleSelectCategory}
                                        >
                                            <option value="default" disabled>Categoria</option>
                                            {categories.map((category, index) => (
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
                                <div className="h-[150px] overflow-auto">
                                    {/* LISTAR DRAFT PEDIDOS */}
                                    {orders.map((order, index) => (
                                        <div key={index}>
                                            <DraftOrderCard
                                                id={order.id}
                                                table_id={order.order_id}
                                                product={order.product_id}
                                                quantity={order.amount}
                                                handleDelete={() => handleDelete(order.id)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    {/* BOTÕES CANCELAR E FAZER PEDIDO */}
                                    <button
                                    className="w-full p-3 border border-gray-400 text-gray-400 rounded-md"
                                    onClick={() => Router.push('/pedidos')}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                    className="w-full p-3 bg-yellow-gourmet text-black rounded-md"
                                    onClick={handleSendOrder}
                                    >
                                        Fazer pedido
                                    </button>
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
    const responseCategory = await api.get('/category');
    const responseOrders = await api.get('/allOrders');

    return {
      props: {
        categoryList: responseCategory.data,
        orderList: responseOrders.data
      }
    }
})