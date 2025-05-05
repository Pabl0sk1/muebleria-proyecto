import { UserEdit } from './UserEdit.jsx'
import { UserList } from './UserList.jsx'
import { useEffect, useState } from 'react'
import { getUsers, saveUsers, updateUsers, deleteUsers } from '../../services/user.service.js'
import { getSales } from '../../services/sale.service.js'

export const UserApp = () => {

    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);

    const [userSelected, setUserSelected] = useState({
        id_user: 0,
        name: '',
        email: '',
        phone: '',
        password: '',
        role: {
            id_role: 0,
            role: ''
        }
    });

    const recuperarUsuariosConAxios = async () => {
        const usuarios = await getUsers();
        const usuariosOrdenados = usuarios.sort((a, b) => b.id_user - a.id_user);
        setUsers(usuariosOrdenados);
    }

    const recuperarVentasConAxios = async () => {
        const ventas = await getSales();
        const ventasOrdenados = ventas.sort((a, b) => b.id_sale - a.id_sale);
        setSales(ventasOrdenados);
    }

    useEffect(() => {
        recuperarUsuariosConAxios();
        recuperarVentasConAxios();
    }, []);

    const editarUsuarioFn = (user) => {
        setUserSelected(Object.assign({}, user));
    }

    const eliminarUsuarioFn = async (id) => {
        await deleteUsers(id);
        setUsers(users.filter(user => user.id_user !== id));

        setUserSelected({
            id_user: 0,
            name: '',
            email: '',
            phone: '',
            password: '',
            role: {
                id_role: 0,
                role: ''
            }
        });
    }

    const guardarFn = async (usuarioAGuardar) => {

        if (usuarioAGuardar.id_user) {
            await updateUsers(usuarioAGuardar.id_user, usuarioAGuardar);
            setUsers(users.map(user => (user.id_user === usuarioAGuardar.id_user ? usuarioAGuardar : user)));
        } else {
            const usuarioGuardado = await saveUsers(usuarioAGuardar);
            setUsers([...users, usuarioGuardado]);
        }

        await recuperarUsuariosConAxios();

        setUserSelected({
            id_user: 0,
            name: '',
            email: '',
            phone: '',
            password: '',
            role: {
                id_role: 0,
                role: ''
            }
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <UserEdit userSelected={userSelected} guardarFn={guardarFn}></UserEdit>
                    </div>
                    <div className='col-9'>
                        <UserList users={users} editarUsuarioFn={editarUsuarioFn} eliminarUsuarioFn={eliminarUsuarioFn} sales={sales}></UserList>
                    </div>
                </div>
            </div>
        </>
    )
}