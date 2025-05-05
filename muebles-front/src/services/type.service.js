import axios from 'axios'

export const getTypes = async () => {
    const result = await axios.get('http://localhost:8080/tipo/listar');
    const tipos = result.data.list;
    return tipos;
}

export const saveTypes = async (tipo) => {
    const response = await axios.post('http://localhost:8080/tipo/guardar', tipo);
    const tipoGuardado = response.data.list;
    return tipoGuardado;
}

export const updateTypes = async (id, tipo) => {
    const response = await axios.put(`http://localhost:8080/tipo/modificar/${id}`, tipo);
    const tipoActualizado = response.data.list;
    return tipoActualizado;
}

export const deleteTypes = async (id) => {
    const response = await axios.delete(`http://localhost:8080/tipo/eliminar/${id}`);
    const tipoEliminado = response.data.list;
    return tipoEliminado;
}
