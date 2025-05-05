import { CustomerEdit } from './CustomerEdit.jsx'
import { CustomerList } from './CustomerList.jsx'
import { useEffect, useState } from 'react'
import { getCustomers, saveCustomers, updateCustomers, deleteCustomers } from '../../services/customer.service.js'
import { getSales } from '../../services/sale.service.js'

export const CustomerApp = () => {

    const [customers, setCustomers] = useState([]);
    const [sales, setSales] = useState([]);

    const [customerSelected, setCustomerSelected] = useState({
        id_customer: 0,
        name: '',
        lastname: '',
        phone: '',
        email: '',
    });

    const recuperarClientesConAxios = async () => {
        const clientes = await getCustomers();
        const clientesOrdenados = clientes.sort((a, b) => b.id_customer - a.id_customer);
        setCustomers(clientesOrdenados);
    }

    const recuperarVentasConAxios = async () => {
        const ventas = await getSales();
        const ventasOrdenados = ventas.sort((a, b) => b.id_sale - a.id_sale);
        setSales(ventasOrdenados);
    }

    useEffect(() => {
        recuperarClientesConAxios();
        recuperarVentasConAxios();
    }, []);

    const editarClienteFn = (customer) => {
        setCustomerSelected(Object.assign({}, customer));
    }

    const eliminarClienteFn = async (id) => {
        await deleteCustomers(id);
        setCustomers(customers.filter(customer => customer.id_customer !== id));

        setCustomerSelected({
            id_customer: 0,
            name: '',
            lastname: '',
            phone: '',
            email: '',
        });
    }

    const guardarFn = async (clienteAGuardar) => {

        if (clienteAGuardar.id_customer) {
            await updateCustomers(clienteAGuardar.id_customer, clienteAGuardar);
            setCustomers(customers.map(customer => customer.id_customer === clienteAGuardar.id_customer ? clienteAGuardar : customer));
        } else {
            const clienteGuardado = await saveCustomers(clienteAGuardar);
            setCustomers([...customers, clienteGuardado]);
        }

        await recuperarClientesConAxios();

        setCustomerSelected({
            id_customer: 0,
            name: '',
            lastname: '',
            phone: '',
            email: '',
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <CustomerEdit customerSelected={customerSelected} guardarFn={guardarFn}></CustomerEdit>
                    </div>
                    <div className='col-9'>
                        <CustomerList customers={customers} editarClienteFn={editarClienteFn} eliminarClienteFn={eliminarClienteFn} sales={sales}></CustomerList>
                    </div>
                </div>
            </div>
        </>
    )
}