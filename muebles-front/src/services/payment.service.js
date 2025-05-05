import axios from 'axios'

export const getPayments = async () => {
    const result = await axios.get('http://localhost:8080/pago/listar');
    const pagos = result.data.list;
    return pagos;
}

export const savePayments = async (pago) => {
    const response = await axios.post('http://localhost:8080/pago/guardar', pago);
    const pagoGuardado = response.data.list;
    return pagoGuardado;
}

export const updatePayments = async (id, pago) => {
    const response = await axios.put(`http://localhost:8080/pago/modificar/${id}`, pago);
    const pagoActualizado = response.data.list;
    return pagoActualizado;
}

export const deletePayments = async (id) => {
    const response = await axios.delete(`http://localhost:8080/pago/eliminar/${id}`);
    const pagoEliminado = response.data.list;
    return pagoEliminado;
}
