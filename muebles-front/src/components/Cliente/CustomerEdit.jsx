import { useEffect, useState } from "react"

export const CustomerEdit = ({ customerSelected, guardarFn }) => {

    const [data, setData] = useState(customerSelected);
    const [initialData] = useState(customerSelected);
    const [nameWarning, setNameWarning] = useState('');
    const [lastnameWarning, setLastnameWarning] = useState('');
    const [phoneWarning, setPhoneWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');

    const { id_customer, name, lastname, phone, email } = data;

    useEffect(() => {
        setData(customerSelected);
    }, [customerSelected]);

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

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setData({ ...data, name: newName });
        setNameWarning(newName.length >= 50 ? 'El nombre ha alcanzado el límite de 50 caracteres.' : '');
    };

    const handleLastnameChange = (event) => {
        const newLastname = event.target.value;
        setData({ ...data, lastname: newLastname });
        setLastnameWarning(newLastname.length >= 50 ? 'El apellido ha alcanzado el límite de 50 caracteres.' : '');
    };

    const handlePhoneChange = (event) => {
        const newPhone = event.target.value;
        setData({ ...data, phone: newPhone });
        setPhoneWarning(newPhone.length >= 15 ? 'El teléfono ha alcanzado el límite de 15 caracteres.' : '');
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setData({ ...data, email: newEmail });
        setEmailWarning(newEmail.length >= 30 ? 'El email ha alcanzado el límite de 30 caracteres.' : '');
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
                    <label className="form-label fw-bold container text-start p-0" htmlFor="id_customer">ID</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="id_customer"
                        value={id_customer}
                        //onChange={(event) => { setData({ ...data, id_customer: event.target.value }) }}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="name">Nombre</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="name"
                        value={name}
                        //onChange={(event) => { setData({ ...data, name: event.target.value }) }}
                        onChange={handleNameChange}
                        required
                        maxLength={50}
                    />
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El nombre es obligatorio y no debe sobrepasar los 50 caracteres.
                    </div>
                    {nameWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{nameWarning}</div>}
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="lastname">Apellido</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="lastname"
                        value={lastname}
                        //onChange={(event) => { setData({ ...data, email: event.target.value }) }}
                        onChange={handleLastnameChange}
                        maxLength={50}
                    />
                    {lastnameWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{lastnameWarning}</div>}
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="phone">Teléfono</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="phone"
                        value={phone}
                        //onChange={(event) => { setData({ ...data, phone: event.target.value }) }}
                        onChange={handlePhoneChange}
                        maxLength={15}
                    />
                    {phoneWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{phoneWarning}</div>}
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="email">Email</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="email"
                        name="email"
                        value={email}
                        //onChange={(event) => { setData({ ...data, email: event.target.value }) }}
                        onChange={handleEmailChange}
                        maxLength={30}
                    />
                    {emailWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{emailWarning}</div>}
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

