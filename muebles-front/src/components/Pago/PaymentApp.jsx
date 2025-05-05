import { PaymentEdit } from './PaymentEdit.jsx'
import { PaymentList } from './PaymentList.jsx'
import { useEffect, useState } from 'react'
import { getPayments, savePayments, updatePayments, deletePayments } from '../../services/payment.service.js'
import { getSales } from '../../services/sale.service.js'

export const PaymentApp = () => {

    const [payments, setPayments] = useState([]);
    const [sales, setSales] = useState([]);

    const [paymentSelected, setPaymentSelected] = useState({
        id_payment: 0,
        payment: ''
    });

    const recuperarPaymentsConAxios = async () => {
        const payments = await getPayments();
        const paymentsOrdenados = payments.sort((a, b) => b.id_payment - a.id_payment);
        setPayments(paymentsOrdenados);
    }

    const recuperarSalesConAxios = async () => {
        const sales = await getSales();
        const salesOrdenados = sales.sort((a, b) => b.id_sale - a.id_sale);
        setSales(salesOrdenados);
    }

    useEffect(() => {
        recuperarPaymentsConAxios();
        recuperarSalesConAxios();
    }, []);

    const editarPagoFn = (payment) => {
        setPaymentSelected(Object.assign({}, payment));
    }

    const eliminarPagoFn = async (id) => {
        await deletePayments(id);
        setPayments(payments.filter(payment => payment.id_payment !== id));

        setPaymentSelected({
            id_payment: 0,
            payment: ''
        });
    }

    const guardarFn = async (pagoAGuardar) => {

        if (pagoAGuardar.id_payment) {
            await updatePayments(pagoAGuardar.id_payment, pagoAGuardar);
            setPayments(payments.map(payment => payment.id_payment === pagoAGuardar.id_payment ? pagoAGuardar : payment));
        } else {
            const pagoGuardado = await savePayments(pagoAGuardar);
            setPayments([...payments, pagoGuardado]);
        }

        await recuperarPaymentsConAxios();

        setPaymentSelected({
            id_payment: 0,
            payment: ''
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <PaymentEdit paymentSelected={paymentSelected} guardarFn={guardarFn}></PaymentEdit>
                    </div>
                    <div className='col-9'>
                        <PaymentList payments={payments} editarPagoFn={editarPagoFn} eliminarPagoFn={eliminarPagoFn} sales={sales}></PaymentList>
                    </div>
                </div>
            </div>
        </>
    )
}