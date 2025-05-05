import axios from 'axios'

export const getRoles = async () => {
    const result = await axios.get('http://localhost:8080/rol/listar');
    const roles = result.data.list;
    return roles;
}

export const saveRoles = async (rol) => {
    const response = await axios.post('http://localhost:8080/rol/guardar', rol);
    const rolGuardado = response.data.list;
    return rolGuardado;
}

export const updateRoles = async (id, rol) => {
    const response = await axios.put(`http://localhost:8080/rol/modificar/${id}`, rol);
    const rolActualizado = response.data.list;
    return rolActualizado;
}

export const deleteRoles = async (id) => {
    const response = await axios.delete(`http://localhost:8080/rol/eliminar/${id}`);
    const rolEliminado = response.data.list;
    return rolEliminado;
}
