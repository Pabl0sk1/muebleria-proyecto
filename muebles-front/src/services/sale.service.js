import axios from 'axios'

export const getSales = async () => {
    const result = await axios.get('http://localhost:8080/venta/listar');
    const ventas = result.data.list;
    return ventas;
}

export const saveSales = async (venta) => {
    const response = await axios.post('http://localhost:8080/venta/guardar', venta);
    const ventaGuardado = response.data.list;
    return ventaGuardado;
}

export const updateSales = async (id, venta) => {
    const response = await axios.put(`http://localhost:8080/venta/modificar/${id}`, venta);
    const ventaActualizado = response.data.list;
    return ventaActualizado;
}

export const deleteSales = async (id) => {
    const response = await axios.delete(`http://localhost:8080/venta/eliminar/${id}`);
    const ventaEliminado = response.data.list;
    return ventaEliminado;
}
