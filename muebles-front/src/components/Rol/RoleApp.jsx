import { RoleEdit } from './RoleEdit.jsx'
import { RoleList } from './RoleList.jsx'
import { useEffect, useState } from 'react'
import { getRoles, saveRoles, updateRoles, deleteRoles } from '../../services/role.service.js'
import { getUsers } from '../../services/user.service.js'

export const RoleApp = () => {

    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);

    const [roleSelected, setRoleSelected] = useState({
        id_role: 0,
        role: ''
    });

    const recuperarRolesConAxios = async () => {
        const roles = await getRoles();
        const rolesOrdenados = roles.sort((a, b) => b.id_role - a.id_role);
        setRoles(rolesOrdenados);
    }

    const recuperarUsuariosConAxios = async () => {
        const usuarios = await getUsers();
        const usuariosOrdenados = usuarios.sort((a, b) => b.id_user - a.id_user);
        setUsers(usuariosOrdenados);
    }

    useEffect(() => {
        recuperarRolesConAxios();
        recuperarUsuariosConAxios();
    }, []);

    const editarRolFn = (role) => {
        setRoleSelected(Object.assign({}, role));
    }

    const eliminarRolFn = async (id) => {
        await deleteRoles(id);
        setRoles(roles.filter(role => role.id_role !== id));

        setRoleSelected({
            id_role: 0,
            role: ''
        });
    }

    const guardarFn = async (rolAGuardar) => {

        if (rolAGuardar.id_role) {
            await updateRoles(rolAGuardar.id_role, rolAGuardar);
            setRoles(roles.map(role => role.id_role === rolAGuardar.id_role ? rolAGuardar : role));
        } else {
            const rolGuardado = await saveRoles(rolAGuardar);
            setRoles([...roles, rolGuardado]);
        }

        await recuperarRolesConAxios();

        setRoleSelected({
            id_role: 0,
            role: ''
        });

    }

    return (
        <>
            <div className='container-fluid mb-4 mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <RoleEdit roleSelected={roleSelected} guardarFn={guardarFn}></RoleEdit>
                    </div>
                    <div className='col-9'>
                        <RoleList roles={roles} editarRolFn={editarRolFn} eliminarRolFn={eliminarRolFn} users={users}></RoleList>
                    </div>
                </div>
            </div>
        </>
    )
}