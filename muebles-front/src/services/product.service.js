import axios from 'axios'

export const getProducts = async () => {
    const result = await axios.get('http://localhost:8080/producto/listar');
    const productos = result.data.list;
    return productos;
}

export const saveProducts = async (producto) => {
    const response = await axios.post('http://localhost:8080/producto/guardar', producto);
    const productoGuardado = response.data.list;
    return productoGuardado;
}

export const updateProducts = async (id, producto) => {
    const response = await axios.put(`http://localhost:8080/producto/modificar/${id}`, producto);
    const productoActualizado = response.data.list;
    return productoActualizado;
}

export const deleteProducts = async (id) => {
    const response = await axios.delete(`http://localhost:8080/producto/eliminar/${id}`);
    const productoEliminado = response.data.list;
    return productoEliminado;
}
