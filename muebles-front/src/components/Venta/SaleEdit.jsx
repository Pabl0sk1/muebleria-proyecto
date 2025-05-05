import { useEffect, useState } from "react";
import { getCustomers } from "../../services/customer.service.js";
import { getUsers } from "../../services/user.service.js";
import { getPayments } from '../../services/payment.service.js';
import { getProducts } from '../../services/product.service.js'

export const SaleEdit = ({ saleSelected, guardarFn, eliminarDetalleFn }) => {

    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [products, setProducts] = useState([]);
    const [initialData] = useState(saleSelected);
    const [data, setData] = useState(saleSelected);
    const [details, setDetails] = useState(saleSelected.saledetail);
    const [initialDetails] = useState([]);
    const [detalleAEliminar, setDetalleAEliminar] = useState(null);
    const [productoError, setProductoError] = useState(null);
    const [productoCero, setProductoCero] = useState(null);

    const { id_sale, date, total, customer, user, payment } = data;

    const recuperarUsersConAxios = async () => {
        setUsers(await getUsers());
    }

    const recuperarCustomersConAxios = async () => {
        setCustomers(await getCustomers());
    }

    const recuperarPaymentsConAxios = async () => {
        setPayments(await getPayments());
    }

    const recuperarProductsConAxios = async () => {
        setProducts(await getProducts());
    }

    useEffect(() => {
        recuperarCustomersConAxios();
        recuperarUsersConAxios();
        recuperarPaymentsConAxios();
        recuperarProductsConAxios();
    }, []);

    useEffect(() => {
        setData(saleSelected);
        setDetails(saleSelected.saledetail || []);
    }, [saleSelected]);

    const confirmarEliminacion = (id) => {
        eliminarDetalleFn(id);
        setDetalleAEliminar(null);
    };

    //Cancelar eliminación con tecla de escape
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setDetalleAEliminar(null);
                setProductoError(null);
                setProductoCero(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    //Validación personalizada de formulario
    useEffect(() => {
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        // Validar que se haya seleccionado un cliente válido
        if (!data.customer || data.customer.id_customer === '') {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Validar que se haya seleccionado un usuario válido
        if (!data.user || data.user.id_user === '') {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Validar que se haya seleccionado un pago válido
        if (!data.payment || data.payment.id_payment === '') {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Validar que la cantidad sea mayor que 0
        if (details.some(detail => detail.quantity <= 0)) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        if (form.checkValidity()) {
            const ventaAGuardar = { ...data, saledetail: details };
            guardarFn(ventaAGuardar);
            form.classList.remove('was-validated');
        } else {
            form.classList.add('was-validated');
        }
    };

    const addDetail = () => {
        const newDetail = {
            id_saledetail: 0,
            quantity: 0,
            subtotal: 0,
            product: {
                id_product: 0,
                name: '',
                stock: 0,
                price: 0,
                type: {
                    id_type: 0,
                    type: ''
                }
            }
        };
        const newDetails = [...details, newDetail];
        setData({ ...data, saledetail: newDetails });
        setDetails(newDetails);
    };

    const updateTotal = () => {
        const newTotal = details.reduce((acc, detail) => acc + detail.subtotal, 0);
        setData({ ...data, total: newTotal });
    };

    useEffect(() => {
        updateTotal();
    }, [details]);

    return (
        <>

            {detalleAEliminar && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-danger alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-exclamation-circle-fill fs-1"></i>
                                <div className="fw-bolder mt-2">¿Estás seguro de que deseas eliminar el detalle?</div>
                                <div className="mt-3">
                                    <button onClick={() => confirmarEliminacion(detalleAEliminar.id_saledetail)} className="btn btn-danger me-3">
                                        <i className="bi bi-trash-fill me-2"></i>Eliminar
                                    </button>
                                    <button onClick={() => setDetalleAEliminar(null)} className="btn btn-secondary ms-3">
                                        <i className="bi bi-x-square-fill me-2"></i>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {productoError && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-database-fill-exclamation fs-1"></i>
                                <div className="fw-bolder mt-2">El producto ya fue seleccionado</div>
                                <button onClick={() => setProductoError(null)} className="btn btn-secondary mt-3">
                                    <i className="bi bi-caret-left-fill me-2"></i>Salir
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {productoCero && (
                <>
                    <div className="position-fixed top-0 start-0 z-2 w-100 h-100 bg-dark opacity-25"></div>
                    <div className="position-fixed top-50 start-50 z-3 d-flex align-items-center justify-content-center translate-middle">
                        <div className="bg-white border border-1 border-black rounded-2 p-0 m-0 shadow-lg">
                            <div className="alert alert-info alert-dismissible fade show m-4 p-3 shadow-sm" role="alert">
                                <i className="bi bi-0-square-fill fs-1"></i>
                                <div className="fw-bolder mt-2">El producto está fuera del stock</div>
                                <button onClick={() => setProductoCero(null)} className="btn btn-secondary mt-3">
                                    <i className="bi bi-caret-left-fill me-2"></i>Salir
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <h2 className="mb-2 mt-3 fw-bolder text-primary text-start p-2">Formulario</h2>
            <form
                action="url.ph"
                //onSubmit={(event) => { event.preventDefault(); guardarFn({ ...data }); }}
                onSubmit={handleSubmit}
                className="needs-validation bg-secondary-subtle p-4 border border-3 border-black rounded-2"
                noValidate
            >
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="id_sale">ID</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="id_sale"
                        value={id_sale}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="date">Fecha</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="date"
                        name="date"
                        value={date}
                        onChange={(event) => { setData({ ...data, date: event.target.value }) }}
                        required
                    />
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>La fecha es obligatoria.
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="customers">Cliente</label>
                    <select
                        className="form-select border border-dark-subtle"
                        name="customers"
                        value={customer ? customer.id_customer : ''}
                        onChange={(event) => {
                            const selectedCustomer = customers.find(r => r.id_customer === parseInt(event.target.value));
                            setData({ ...data, customer: selectedCustomer });
                        }}
                        required
                    >
                        <option value="" className="bg-secondary-subtle">Seleccione un cliente...</option>
                        {customers.map((customer) => (
                            <option key={customer.id_customer} value={customer.id_customer}>{customer.name} {customer.lastname}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El cliente es obligatorio.
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="users">Usuario</label>
                    <select
                        className="form-select border border-dark-subtle"
                        name="users"
                        value={user ? user.id_user : ''}
                        onChange={(event) => {
                            const selectedUser = users.find(r => r.id_user === parseInt(event.target.value));
                            setData({ ...data, user: selectedUser });
                        }}
                        required
                    >
                        <option value="" className="bg-secondary-subtle">Seleccione un usuario...</option>
                        {users.map((user) => (
                            <option key={user.id_user} value={user.id_user}>{user.name}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El usuario es obligatorio.
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="payments">Pago</label>
                    <select
                        className="form-select border border-dark-subtle"
                        name="payments"
                        value={payment ? payment.id_payment : ''}
                        onChange={(event) => {
                            const selectedPayment = payments.find(r => r.id_payment === parseInt(event.target.value));
                            setData({ ...data, payment: selectedPayment });
                        }}
                        required
                    >
                        <option value="" className="bg-secondary-subtle">Seleccione un pago...</option>
                        {payments.map((payment) => (
                            <option key={payment.id_payment} value={payment.id_payment}>{payment.payment}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El pago es obligatorio.
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="total">Total</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="number"
                        name="total"
                        value={total || 0}
                        onChange={(event) => { setData({ ...data, total: event.target.value }) }}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0">Detalles</label>
                    <div className="container m-0 p-0 overflow-y-auto w-100 border border-3 border-black rounded-2" style={{ maxHeight: '176px' }}>
                        <table className="table table-hover table-striped-columns border-line border-end border-3 border-black m-0 rounded-2">
                            <thead>
                                <tr className="table table-primary text-center align-middle">
                                    <th className="p-0">
                                        <div className="border-bottom border-2 border-black p-2">
                                            <button type="button" className="p-0 m-0 border-0" onClick={addDetail}><i className="bi bi-plus-circle-fill m-0 p-0 add-row"></i></button>
                                        </div>
                                    </th>
                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Producto</div></th>
                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Cantidad</div></th>
                                    <th className="p-0"><div className="border-bottom border-2 border-black p-2">Subtotal</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {details && details.length > 0 ? (
                                    details.map((detail, index) => {
                                        if (!detail) return null;
                                        return (
                                            <tr className="text-center align-middle" key={index}>
                                                <td>
                                                    <button type="button" className="p-0 m-0 border-0 bg-transparent" onClick={() => setDetalleAEliminar(detail)}><i className="bi bi-trash-fill m-0 p-0 delete-row"></i></button>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-select w-100 border-0 bg-transparent"
                                                        name="products"
                                                        value={detail.product ? detail.product.id_product : ''}
                                                        onChange={(event) => {
                                                            const selectedProduct = products.find(r => r.id_product === parseInt(event.target.value));
                                                            const newDetails = [...details];
                                                            if (newDetails.some(d => d.product && d.product.id_product === selectedProduct.id_product)) {
                                                                setProductoError(detail)
                                                                return;
                                                            } else {
                                                                if (selectedProduct.stock <= 0) {
                                                                    setProductoCero(detail);
                                                                    return;
                                                                }
                                                            }
                                                            newDetails[index].product = selectedProduct;
                                                            setData({ ...data, saledetail: newDetails });
                                                            setDetails(newDetails);
                                                        }}
                                                        required
                                                    >
                                                        <option value="" className="bg-secondary-subtle">Seleccione...</option>
                                                        {products.map((product) => (
                                                            <option key={product.id_product} value={product.id_product}>{product.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control border-0 bg-transparent w-100"
                                                        type="number"
                                                        value={detail.quantity || ''}
                                                        min={1}
                                                        onChange={(event) => {
                                                            const newDetails = [...details];
                                                            newDetails[index].quantity = parseInt(event.target.value);
                                                            newDetails[index].subtotal = parseInt(newDetails[index].quantity) * parseInt(newDetails[index].product.price);
                                                            setData({ ...data, saledetail: newDetails });
                                                            setDetails(newDetails);
                                                        }}
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        className="form-control border-0 bg-transparent w-100"
                                                        type="number"
                                                        value={detail.subtotal || 0}
                                                        readOnly
                                                    />
                                                </td>
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
                </div>

                <div className="mt-4">
                    <button className="btn btn-success me-3" type="submit">
                        <i className="bi bi-floppy-fill me-2"></i>Guardar
                    </button>
                    <button className="btn btn-danger ms-3" type="button"
                        onClick={() => {
                            setData(initialData);
                            setDetails(initialDetails);
                        }}>
                        <i className="bi bi-backspace-fill me-2"></i>Deshacer
                    </button>
                </div>
            </form >
        </>
    )
}
