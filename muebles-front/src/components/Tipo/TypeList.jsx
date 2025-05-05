import React, { useState, useEffect } from 'react';

export const TypeList = ({ types, editarTipoFn, eliminarTipoFn, products }) => {

    const [tipoAEliminar, setTipoAEliminar] = useState(null);
    const [tipoAVisualizar, setTipoAVisualizar] = useState(null);
    const [tipoNoEliminar, setTipoNoEliminar] = useState(null);

    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setTipoAEliminar(null);
                setTipoAVisualizar(null);
                setTipoNoEliminar(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const confirmarEliminacion = (id) => {
        eliminarTipoFn(id);
        setTipoAEliminar(null);
    };

    //Verifica si se puede eliminar
    const handleEliminarTipo = (type) => {
        if (products.some(product => product.type.id_type === type.id_type)) {
            setTipoNoEliminar(type);
        } else {
            setTipoAEliminar(type);
        }
    };

    return (
        <>
            {tipoAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" type="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar el tipo?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(tipoAEliminar.id_type)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setTipoAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tipoAVisualizar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-primary alert-dismissible fade show m-4 p-3 shadow-sm" type="alert">
                                <i className="bi bi-file-earmark-text-fill fs-1"></i>
                                <div className="fw-bolder mt-2">Datos del Tipo</div>
                                <div className="mt-3">
                                    <div className="text-start">
                                        <p><strong>ID:</strong> {tipoAVisualizar.id_type}</p>
                                        <p><strong>Tipo:</strong> {tipoAVisualizar.type}</p>
                                    </div>
                                    <button onClick={() => setTipoAVisualizar(null)} className="btn btn-secondary mt-3">
                                        <i className="bi bi-caret-left-fill me-2"></i>Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {tipoNoEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-database-fill-exclamation fs-1"></i>
                                <div className="fw-bolder mt-2">El tipo está siendo referenciado</div>
                                <button onClick={() => setTipoNoEliminar(null)} className="btn btn-secondary mt-3">
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
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Tipo</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Operaciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {types && types.length > 0 ? (
                            types.map(type => {
                                if (!type) return null;
                                return (
                                    <tr className="text-center align-middle" key={type.id_type}>
                                        <td>{type.id_type}</td>
                                        <td>{type.type}</td>
                                        <td>
                                            <button onClick={() => setTipoAVisualizar(type)} className="btn btn-primary btn-sm me-2">
                                                <i className="bi bi-eye text-light"></i>
                                            </button>
                                            <button onClick={() => editarTipoFn(type)} className="btn btn-warning btn-sm ms-2 me-2">
                                                <i className="bi bi-pen text-light"></i>
                                            </button>
                                            <button onClick={() => { handleEliminarTipo(type) }} className="btn btn-danger btn-sm ms-2">
                                                <i className="bi bi-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-start">
                                <td colSpan="3" className="ps-5">No hay types disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
