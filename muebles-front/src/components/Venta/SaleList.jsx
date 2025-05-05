import React, { useState, useEffect } from 'react';

export const SaleList = ({ sales, editarVentaFn, eliminarVentaFn }) => {

    const [ventaAEliminar, setVentaAEliminar] = useState(null);
    const [ventaAVisualizar, setVentaAVisualizar] = useState(null);

    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setVentaAEliminar(null);
                setVentaAVisualizar(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    const confirmarEliminacion = (id) => {
        eliminarVentaFn(id);
        setVentaAEliminar(null);
    };

    return (
        <>
            {ventaAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar la venta?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(ventaAEliminar.id_sale)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setVentaAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {ventaAVisualizar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-primary alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-file-earmark-text-fill fs-1"></i>
                                <div className="fw-bolder mt-2">Datos de la Venta</div>
                                <div className="mt-3">
                                    <div className="text-start">
                                        <p><strong>ID:</strong> {ventaAVisualizar.id_sale}</p>
                                        <p><strong>Fecha:</strong> {ventaAVisualizar.date}</p>
                                        <p><strong>Cliente:</strong> {ventaAVisualizar.customer.name} {ventaAVisualizar.customer.lastname}</p>
                                        <p><strong>Usuario:</strong> {ventaAVisualizar.user.name} </p>
                                        <p><strong>Pago:</strong> {ventaAVisualizar.payment.payment} </p>
                                        <p><strong>Total:</strong> {ventaAVisualizar.total}</p>
                                    </div>
                                    <div className="container m-0 p-0 overflow-y-auto w-100 border border-3 border-black rounded-2" style={{ maxHeight: '176px' }}>
                                        <table className="table table-hover table-striped-columns border-line border-end border-3 border-black m-0 rounded-2">
                                            <thead>
                                                <tr className="table table-primary text-center align-middle">
                                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">ID</div></th>
                                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Cantidad</div></th>
                                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Producto</div></th>
                                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Subtotal</div></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ventaAVisualizar.saledetail && ventaAVisualizar.saledetail.length > 0 ? (
                                                    ventaAVisualizar.saledetail.map(detail => {
                                                        if (!detail) return null;
                                                        return (
                                                            <tr className="text-center align-middle" key={detail.id_saledetail}>
                                                                <td>{detail.id_saledetail}</td>
                                                                <td>{detail.quantity}</td>
                                                                <td>{detail.product.name}</td>
                                                                <td>{detail.total}</td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr className="text-start">
                                                        <td colSpan="4" className="ps-5">No hay detalles disponibles</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={() => setVentaAVisualizar(null)} className="btn btn-secondary mt-3">
                                        <i className="bi bi-caret-left-fill me-2"></i>Salir
                                    </button>
                                </div>
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
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Fecha</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Cliente</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Usuario</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Pago</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Total</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Detalles</div></th>
                            <th className="p-0"><div className="border-bottom border-2 border-black p-2">Operaciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales.length > 0 ? (
                            sales.map(sale => {
                                if (!sale) return null;
                                return (
                                    <tr className="text-center align-middle" key={sale.id_sale}>
                                        <td>{sale.id_sale}</td>
                                        <td>{sale.date}</td>
                                        <td>{sale.customer.name} {sale.customer.lastname}</td>
                                        <td>{sale.user.name}</td>
                                        <td>{sale.payment.payment}</td>
                                        <td>{sale.total}</td>
                                        <td>{sale.saledetail.length}</td>
                                        <td>
                                            <button onClick={() => setVentaAVisualizar(sale)} className="btn btn-primary btn-sm me-2">
                                                <i className="bi bi-eye text-light"></i>
                                            </button>
                                            <button onClick={() => editarVentaFn(sale)} className="btn btn-warning btn-sm ms-2 me-2">
                                                <i className="bi bi-pen text-light"></i>
                                            </button>
                                            <button onClick={() => { setVentaAEliminar(sale) }} className="btn btn-danger btn-sm ms-2">
                                                <i className="bi bi-trash text-light"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-start">
                                <td colSpan="8" className="ps-5">No hay ventas disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
