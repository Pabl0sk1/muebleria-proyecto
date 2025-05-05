import { TypeEdit } from './TypeEdit.jsx'
import { TypeList } from './TypeList.jsx'
import { useEffect, useState } from 'react'
import { getTypes, saveTypes, updateTypes, deleteTypes } from '../../services/type.service.js'
import { getProducts } from '../../services/product.service.js'

export const TypeApp = () => {

    const [types, setTypes] = useState([]);
    const [products, setProducts] = useState([]);

    const [typeSelected, setTypeSelected] = useState({
        id_type: 0,
        type: ''
    });

    const recuperarTypesConAxios = async () => {
        const types = await getTypes();
        const typesOrdenados = types.sort((a, b) => b.id_type - a.id_type);
        setTypes(typesOrdenados);
    }

    const recuperarProductosConAxios = async () => {
        const productos = await getProducts();
        const productosOrdenados = productos.sort((a, b) => b.id_product - a.id_product);
        setProducts(productosOrdenados);
    }

    useEffect(() => {
        recuperarTypesConAxios();
        recuperarProductosConAxios();
    }, []);

    const editarTipoFn = (type) => {
        setTypeSelected(Object.assign({}, type));
    }

    const eliminarTipoFn = async (id) => {
        await deleteTypes(id);
        setTypes(types.filter(type => type.id_type !== id));

        setTypeSelected({
            id_type: 0,
            type: ''
        });
    }

    const guardarFn = async (tipoAGuardar) => {

        if (tipoAGuardar.id_type) {
            await updateTypes(tipoAGuardar.id_type, tipoAGuardar);
            setTypes(types.map(type => type.id_type === tipoAGuardar.id_type ? tipoAGuardar : type));
        } else {
            const tipoGuardado = await saveTypes(tipoAGuardar);
            setTypes([...types, tipoGuardado]);
        }

        await recuperarTypesConAxios();

        setTypeSelected({
            id_type: 0,
            type: ''
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <TypeEdit typeSelected={typeSelected} guardarFn={guardarFn}></TypeEdit>
                    </div>
                    <div className='col-9'>
                        <TypeList types={types} editarTipoFn={editarTipoFn} eliminarTipoFn={eliminarTipoFn} products={products}></TypeList>
                    </div>
                </div>
            </div>
        </>
    )
}