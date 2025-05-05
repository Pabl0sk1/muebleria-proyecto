import { useEffect, useState } from "react"

export const PaymentEdit = ({ paymentSelected, guardarFn }) => {

    const [data, setData] = useState(paymentSelected);
    const [initialData] = useState(paymentSelected);
    const [paymentWarning, setPaymentWarning] = useState('');

    const { id_payment, payment } = data;

    useEffect(() => {
        setData(paymentSelected);
    }, [paymentSelected]);

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

        if (form.checkValidity()) {
            guardarFn({ ...data });
            form.classList.remove('was-validated');
        } else {
            form.classList.add('was-validated');
        }
    };

    const handlePaymentChange = (event) => {
        const newPayment = event.target.value;
        setData({ ...data, payment: newPayment });
        setPaymentWarning(newPayment.length >= 50 ? 'El pago ha alcanzado el límite de 50 caracteres.' : '');
    };

    return (
        <>
            <h2 className="mb-2 mt-3 fw-bolder text-primary text-start p-2">Formulario</h2>
            <form
                action="url.ph"
                //onSubmit={(event) => { event.preventDefault(); guardarFn({ ...data }); }}
                onSubmit={handleSubmit}
                className="needs-validation bg-secondary-subtle p-4 border border-3 border-black rounded-2"
                noValidate
            >
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="id_payment">ID</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="id_payment"
                        value={id_payment}
                        //onChange={(event) => { setData({ ...data, id_payment: event.target.value }) }}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="payment">Pago</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="payment"
                        value={payment}
                        //onChange={(event) => { setData({ ...data, name: event.target.value }) }}
                        onChange={handlePaymentChange}
                        required
                        maxLength={50}
                    />
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El pago es obligatorio y no debe sobrepasar los 50 caracteres.
                    </div>
                    {paymentWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{paymentWarning}</div>}
                </div>

                <div className="mt-4">
                    <button className="btn btn-success me-3" type="submit">
                        <i className="bi bi-floppy-fill me-2"></i>Guardar
                    </button>
                    <button className="btn btn-danger ms-3" type="button" onClick={() => setData(initialData)}>
                        <i className="bi bi-backspace-fill me-2"></i>Deshacer
                    </button>
                </div>
            </form >
        </>
    )
}
