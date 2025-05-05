import axios from 'axios'

export const getDetails = async () => {
    const result = await axios.get('http://localhost:8080/venta/listarDetalle');
    const detalles = result.data.list;
    return detalles;
}

export const saveDetails = async (detalles) => {
    const response = await axios.post('http://localhost:8080/venta/guardarDetalle', detalles);
    const detallesGuardado = response.data.list;
    return detallesGuardado;
}

export const deleteDetails = async (id) => {
    const response = await axios.delete(`http://localhost:8080/venta/eliminarDetalle/${id}`);
    const detalleEliminado = response.data.list;
    return detalleEliminado;
}
