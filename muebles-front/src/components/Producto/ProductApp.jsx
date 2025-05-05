import { ProductEdit } from './ProductEdit.jsx'
import { ProductList } from './ProductList.jsx'
import { useEffect, useState } from 'react'
import { getProducts, saveProducts, updateProducts, deleteProducts } from '../../services/product.service.js'
import { getDetails } from '../../services/saledetail.service.js'

export const ProductApp = () => {

    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState([]);

    const [productSelected, setProductSelected] = useState({
        id_product: 0,
        name: '',
        stock: 0,
        price: 0,
        type: {
            id_type: 0,
            type: ''
        }
    });

    const recuperarProductosConAxios = async () => {
        const productos = await getProducts();
        const productosOrdenados = productos.sort((a, b) => b.id_product - a.id_product);
        setProducts(productosOrdenados);
    }

    const recuperarDetallesConAxios = async () => {
        const detalles = await getDetails();
        const detallesOrdenados = detalles.sort((a, b) => b.id_saledetail - a.id_saledetail);
        setDetails(detallesOrdenados);
    }

    useEffect(() => {
        recuperarProductosConAxios();
        recuperarDetallesConAxios();
    }, []);

    const editarProductoFn = (product) => {
        setProductSelected(Object.assign({}, product));
    }

    const eliminarProductoFn = async (id) => {
        await deleteProducts(id);
        setProducts(products.filter(product => product.id_product !== id));
        setProductSelected({
            id_product: 0,
            name: '',
            stock: 0,
            price: 0,
            type: {
                id_type: 0,
                type: ''
            }
        });
    }

    const guardarFn = async (productoAGuardar) => {

        if (productoAGuardar.id_product) {
            await updateProducts(productoAGuardar.id_product, productoAGuardar);
            setProducts(products.map(product => product.id_product === productoAGuardar.id_product ? productoAGuardar : product));
        } else {
            const productoGuardado = await saveProducts(productoAGuardar);
            setProducts([...products, productoGuardado]);
        }

        await recuperarProductosConAxios();

        setProductSelected({
            id_product: 0,
            name: '',
            stock: 0,
            price: 0,
            type: {
                id_type: 0,
                type: ''
            }
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <ProductEdit productSelected={productSelected} guardarFn={guardarFn}></ProductEdit>
                    </div>
                    <div className='col-9'>
                        <ProductList products={products} editarProductoFn={editarProductoFn} eliminarProductoFn={eliminarProductoFn} details={details}></ProductList>
                    </div>
                </div>
            </div>
        </>
    )
}