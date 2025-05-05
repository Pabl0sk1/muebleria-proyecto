import axios from 'axios'

export const getCustomers = async () => {
    const result = await axios.get('http://localhost:8080/cliente/listar');
    const clientes = result.data.list;
    return clientes;
}

export const saveCustomers = async (cliente) => {
    const response = await axios.post('http://localhost:8080/cliente/guardar', cliente);
    const clienteGuardado = response.data.list;
    return clienteGuardado;
}

export const updateCustomers = async (id, cliente) => {
    const response = await axios.put(`http://localhost:8080/cliente/modificar/${id}`, cliente);
    const clienteActualizado = response.data.list;
    return clienteActualizado;
}

export const deleteCustomers = async (id) => {
    const response = await axios.delete(`http://localhost:8080/cliente/eliminar/${id}`);
    const clienteEliminado = response.data.list;
    return clienteEliminado;
}
