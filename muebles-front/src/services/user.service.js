import axios from 'axios'

export const getUsers = async () => {
    const result = await axios.get('http://localhost:8080/usuario/listar');
    const usuarios = result.data.list;
    return usuarios;
}

export const saveUsers = async (usuario) => {
    const response = await axios.post('http://localhost:8080/usuario/guardar', usuario);
    const usuarioGuardado = response.data.list;
    return usuarioGuardado;
}

export const updateUsers = async (id, usuario) => {
    const response = await axios.put(`http://localhost:8080/usuario/modificar/${id}`, usuario);
    const usuarioActualizado = response.data.list;
    return usuarioActualizado;
}

export const deleteUsers = async (id) => {
    const response = await axios.delete(`http://localhost:8080/usuario/eliminar/${id}`);
    const usuarioEliminado = response.data.list;
    return usuarioEliminado;
}
