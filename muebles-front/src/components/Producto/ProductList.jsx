import React, { useState, useEffect } from 'react';

export const ProductList = ({ products, editarProductoFn, eliminarProductoFn, details }) => {

    const [productoAEliminar, setProductoAEliminar] = useState(null);
    const [productoAVisualizar, setProductoAVisualizar] = useState(null);
    const [productoNoEliminar, setProductoNoEliminar] = useState(null);

    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setProductoAEliminar(null);
                setProductoAVisualizar(null);
                setProductoNoEliminar(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const confirmarEliminacion = (id) => {
        eliminarProductoFn(id);
        setProductoAEliminar(null);
    };

    //Verifica si se puede eliminar
    const handleEliminarProducto = (product) => {
        if (details.some(d => d.product.id_product === product.id_product)) {
            setProductoNoEliminar(product);
        } else {
            setProductoAEliminar(product);
        }
    };

    return (
        <>
            {productoAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar el producto?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(productoAEliminar.id_product)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setProductoAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {productoAVisualizar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-primary alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-file-earmark-text-fill fs-1"></i>
                                <div className="fw-bolder mt-2">Datos del Producto</div>
                                <div className="mt-3">
                                    <div className="text-start">
                                        <p><strong>ID:</strong> {productoAVisualizar.id_product}</p>
                                        <p><strong>Nombre:</strong> {productoAVisualizar.name}</p>
                                        <p><strong>Stock:</strong> {productoAVisualizar.stock}</p>
                                        <p><strong>Precio:</strong> {productoAVisualizar.price}</p>
                                        <p><strong>Tipo:</strong> {productoAVisualizar.type.type}</p>
                                    </div>
                                    <button onClick={() => setProductoAVisualizar(null)} className="btn btn-secondary mt-3">
                                        <i className="bi bi-caret-left-fill me-2"></i>Salir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {productoNoEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-database-fill-exclamation fs-1"></i>
                                <div className="fw-bolder mt-2">El producto está siendo referenciado</div>
                                <button onClick={() => setProductoNoEliminar(null)} className="btn btn-secondary mt-3">
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
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Stock</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Precio</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Tipo</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Operaciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? (
                            products.map(product => {
                                if (!product) return null;
                                return (
                                    <tr className="text-center align-middle" key={product.id_product}>
                                        <td>{product.id_product}</td>
                                        <td>{product.name}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>{product.type ? product.type.type : 'N/A'}</td>
                                        <td>
                                            <button onClick={() => setProductoAVisualizar(product)} className="btn btn-primary btn-sm me-2">
                                                <i className="bi bi-eye text-light"></i>
                                            </button>
                                            <button onClick={() => editarProductoFn(product)} className="btn btn-warning btn-sm ms-2 me-2">
                                                <i className="bi bi-pen text-light"></i>
                                            </button>
                                            <button onClick={() => { handleEliminarProducto(product) }} className="btn btn-danger btn-sm ms-2">
                                                <i className="bi bi-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-start">
                                <td colSpan="6" className="ps-5">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

