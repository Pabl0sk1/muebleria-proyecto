import { SaleEdit } from './SaleEdit.jsx'
import { SaleList } from './SaleList.jsx'
import { useEffect, useState } from 'react'
import { getSales, saveSales, updateSales, deleteSales } from '../../services/sale.service.js'
import { deleteDetails } from '../../services/saledetail.service.js'

export const SaleApp = () => {

    const [sales, setSales] = useState([]);

    const [saleSelected, setSaleSelected] = useState({
        id_sale: 0,
        date: '',
        total: 0,
        customer: {
            id_customer: 0,
            name: '',
            lastname: '',
            phone: '',
            email: ''
        },
        user: {
            id_user: 0,
            name: '',
            email: '',
            phone: '',
            password: '',
            role: {
                id_role: 0,
                role: ''
            }
        },
        payment: {
            id_payment: 0,
            payment: ''
        },
        saledetail: [
            {
                id_saledetail: 0,
                quantity: 0,
                subtotal: 0,
                product: {
                    id_product: 0,
                    name: '',
                    stock: 0,
                    price: 0,
                    type: {
                        id_type: 0,
                        type: ''
                    }
                }
            }
        ]
    });

    const recuperarVentasConAxios = async () => {
        const ventas = await getSales();
        const ventasOrdenados = ventas.sort((a, b) => b.id_sale - a.id_sale);
        setSales(ventasOrdenados);
    }

    useEffect(() => {
        recuperarVentasConAxios();
    }, []);

    const editarVentaFn = (sale) => {
        setSaleSelected(Object.assign({}, sale));
    }

    const eliminarVentaFn = async (id) => {
        await deleteSales(id);
        setSales(sales.filter(sale => sale.id_sale !== id));

        setSaleSelected({
            id_sale: 0,
            date: '',
            total: 0,
            customer: {
                id_customer: 0,
                name: '',
                lastname: '',
                phone: '',
                email: ''
            },
            user: {
                id_user: 0,
                name: '',
                email: '',
                phone: '',
                password: '',
                role: {
                    id_role: 0,
                    role: ''
                }
            },
            payment: {
                id_payment: 0,
                payment: ''
            },
            saledetail: [
                {
                    id_saledetail: 0,
                    quantity: 0,
                    subtotal: 0,
                    product: {
                        id_product: 0,
                        name: '',
                        stock: 0,
                        price: 0,
                        type: {
                            id_type: 0,
                            type: ''
                        }
                    }
                }
            ]
        });
    }

    const eliminarDetalleFn = async (id_saledetail) => {
        await deleteDetails(id_saledetail);
        const newSaleSelected = { ...saleSelected };
        newSaleSelected.saledetail = newSaleSelected.saledetail.filter(detail => detail.id_saledetail !== id_saledetail);
        setSaleSelected(newSaleSelected);
        recuperarVentasConAxios();
    }

    const guardarFn = async (ventaAGuardar) => {

        if (ventaAGuardar.id_sale) {
            await updateSales(ventaAGuardar.id_sale, ventaAGuardar);
            setSales(sales.map(sale => (sale.id_sale === ventaAGuardar.id_sale ? ventaAGuardar : sale)));
        } else {
            const ventaGuardado = await saveSales(ventaAGuardar);
            setSales([...sales, ventaGuardado]);
        }

        await recuperarVentasConAxios();

        setSaleSelected({
            id_sale: 0,
            date: '',
            total: 0,
            customer: {
                id_customer: 0,
                name: '',
                lastname: '',
                phone: '',
                email: ''
            },
            user: {
                id_user: 0,
                name: '',
                email: '',
                phone: '',
                password: '',
                role: {
                    id_role: 0,
                    role: ''
                }
            },
            payment: {
                id_payment: 0,
                payment: ''
            },
            saledetail: [
                {
                    id_saledetail: 0,
                    quantity: 0,
                    subtotal: 0,
                    product: {
                        id_product: 0,
                        name: '',
                        stock: 0,
                        price: 0,
                        type: {
                            id_type: 0,
                            type: ''
                        }
                    }
                }
            ]
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-4'>
                        <SaleEdit saleSelected={saleSelected} guardarFn={guardarFn} eliminarDetalleFn={eliminarDetalleFn}></SaleEdit>
                    </div>
                    <div className='col-8'>
                        <SaleList sales={sales} editarVentaFn={editarVentaFn} eliminarVentaFn={eliminarVentaFn}></SaleList>
                    </div>
                </div>
            </div>
        </>
    )
}
