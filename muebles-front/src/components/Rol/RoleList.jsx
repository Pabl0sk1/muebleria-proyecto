import React, { useState, useEffect } from 'react';

export const RoleList = ({ roles, editarRolFn, eliminarRolFn, users }) => {

    const [rolAEliminar, setRolAEliminar] = useState(null);
    const [rolAVisualizar, setRolAVisualizar] = useState(null);
    const [rolNoEliminar, setRolNoEliminar] = useState(null);


    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setRolAEliminar(null);
                setRolAVisualizar(null);
                setRolNoEliminar(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const confirmarEliminacion = (id) => {
        eliminarRolFn(id);
        setRolAEliminar(null);
    };

    //Verifica si se puede eliminar
    const handleEliminarRol = (role) => {
        if (users.some(user => user.role.id_role === role.id_role)) {
            setRolNoEliminar(role);
        } else {
            setRolAEliminar(role);
        }
    };

    return (
        <>
            {rolAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar el rol?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(rolAEliminar.id_role)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setRolAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {rolAVisualizar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-primary alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-file-earmark-text-fill fs-1"></i>
                                <div className="fw-bolder mt-2">Datos del Rol</div>
                                <div className="mt-3">
                                    <div className="text-start">
                                        <p><strong>ID:</strong> {rolAVisualizar.id_role}</p>
                                        <p><strong>Rol:</strong> {rolAVisualizar.role}</p>
                                    </div>
                                    <button onClick={() => setRolAVisualizar(null)} className="btn btn-secondary mt-3">
                                        <i className="bi bi-caret-left-fill me-2"></i>Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {rolNoEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-database-fill-exclamation fs-1"></i>
                                <div className="fw-bolder mt-2">El rol está siendo referenciado</div>
                                <button onClick={() => setRolNoEliminar(null)} className="btn btn-secondary mt-3">
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
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Rol</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Operaciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles && roles.length > 0 ? (
                            roles.map(role => {
                                if (!role) return null;
                                return (
                                    <tr className="text-center align-middle" key={role.id_role}>
                                        <td>{role.id_role}</td>
                                        <td>{role.role}</td>
                                        <td>
                                            <button onClick={() => setRolAVisualizar(role)} className="btn btn-primary btn-sm me-2">
                                                <i className="bi bi-eye text-light"></i>
                                            </button>
                                            <button onClick={() => editarRolFn(role)} className="btn btn-warning btn-sm ms-2 me-2">
                                                <i className="bi bi-pen text-light"></i>
                                            </button>
                                            <button onClick={() => { handleEliminarRol(role) }} className="btn btn-danger btn-sm ms-2">
                                                <i className="bi bi-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-start">
                                <td colSpan="3" className="ps-5">No hay roles disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
