import React, { useState, useEffect } from 'react';

export const UserList = ({ users, editarUsuarioFn, eliminarUsuarioFn, sales }) => {

    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const [usuarioAVisualizar, setUsuarioAVisualizar] = useState(null);
    const [usuarioNoEliminar, setUsuarioNoEliminar] = useState(null);

    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setUsuarioAEliminar(null);
                setUsuarioAVisualizar(null);
                setUsuarioNoEliminar(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const confirmarEliminacion = (id) => {
        eliminarUsuarioFn(id);
        setUsuarioAEliminar(null);
    };

    //Verifica si se puede eliminar
    const handleEliminarUsuario = (user) => {
        if (sales.some(sale => sale.user.id_user === user.id_user)) {
            setUsuarioNoEliminar(user);
        } else {
            setUsuarioAEliminar(user);
        }
    };

    return (
        <>
            {usuarioAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar el usuario?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(usuarioAEliminar.id_user)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setUsuarioAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {usuarioAVisualizar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-primary alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-file-earmark-text-fill fs-1"></i>
                                <div className="fw-bolder mt-2">Datos del Usuario</div>
                                <div className="mt-3">
                                    <div className="text-start">
                                        <p><strong>ID:</strong> {usuarioAVisualizar.id_user}</p>
                                        <p><strong>Nombre:</strong> {usuarioAVisualizar.name}</p>
                                        <p><strong>Email:</strong> {usuarioAVisualizar.email}</p>
                                        <p><strong>Teléfono:</strong> {usuarioAVisualizar.phone}</p>
                                        <p><strong>Rol:</strong> {usuarioAVisualizar.role.role}</p>
                                    </div>
                                    <button onClick={() => setUsuarioAVisualizar(null)} className="btn btn-secondary mt-3">
                                        <i className="bi bi-caret-left-fill me-2"></i>Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {usuarioNoEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-database-fill-exclamation fs-1"></i>
                                <div className="fw-bolder mt-2">El usuario está siendo referenciado</div>
                                <button onClick={() => setUsuarioNoEliminar(null)} className="btn btn-secondary mt-3">
                                    <i className="bi bi-caret-left-fill me-2"></i>Salir
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <h2 className="mb-2 mt-3 fw-bolder text-primary text-start p-2">Listado</h2>
            <div className="container m-0 p-0 overflow-y-auto w-100 border border-3 border-black rounded-2" style={{ maxHeight: '520px' }}>
                <table className="table table-hover table-striped-columns border-line border-end border-3 border-black m-0 rounded-2">
                    <thead>
                        <tr className="table table-primary text-center align-middle">
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">ID</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Nombre</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Email</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Teléfono</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Rol</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Operaciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? (
                            users.map(user => {
                                if (!user) return null;
                                return (
                                    <tr className="text-center align-middle" key={user.id_user}>
                                        <td>{user.id_user}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role.role}</td>
                                        <td>
                                            <button onClick={() => setUsuarioAVisualizar(user)} className="btn btn-primary btn-sm me-2">
                                                <i className="bi bi-eye text-light"></i>
                                            </button>
                                            <button onClick={() => editarUsuarioFn(user)} className="btn btn-warning btn-sm ms-2 me-2">
                                                <i className="bi bi-pen text-light"></i>
                                            </button>
                                            <button onClick={() => { handleEliminarUsuario(user) }} className="btn btn-danger btn-sm ms-2">
                                                <i className="bi bi-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-start">
                                <td colSpan="6" className="ps-5">No hay usuarios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

