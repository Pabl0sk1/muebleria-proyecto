import { useEffect, useState } from "react"
import { getRoles } from "../../services/role.service.js";

export const UserEdit = ({ userSelected, guardarFn }) => {

    const [roles, setRoles] = useState([]);
    const [data, setData] = useState(userSelected);
    const [initialData] = useState(userSelected);
    const [showPassword, setShowPassword] = useState(false);
    const [nameWarning, setNameWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [phoneWarning, setPhoneWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    const { id_user, name, email, phone, password, role } = data;

    const recuperarRolesConAxios = async () => {
        setRoles(await getRoles());
    }

    useEffect(() => {
        recuperarRolesConAxios();
    }, []);

    useEffect(() => {
        setData(userSelected);
    }, [userSelected]);

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

        // Validar que se haya seleccionado un rol válido
        if (!data.role || data.role.id_role === '') {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

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

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setData({ ...data, email: newEmail });
        setEmailWarning(newEmail.length >= 30 ? 'El email ha alcanzado el límite de 30 caracteres.' : '');
    };

    const handlePhoneChange = (event) => {
        const newPhone = event.target.value;
        setData({ ...data, phone: newPhone });
        setPhoneWarning(newPhone.length >= 15 ? 'El teléfono ha alcanzado el límite de 15 caracteres.' : '');
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setData({ ...data, password: newPassword });
        setPasswordWarning(newPassword.length >= 30 ? 'La contraseña ha alcanzado el límite de 30 caracteres.' : '');
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
                    <label className="form-label fw-bold container text-start p-0" htmlFor="id_user">ID</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="id_user"
                        value={id_user}
                        //onChange={(event) => { setData({ ...data, id_user: event.target.value }) }}
                        readOnly
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="name">Nombre</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text border border-dark-subtle fw-bold user-select-none" id="inputGroupPrepend">@</span>
                        <input
                            className="form-control border border-dark-subtle"
                            type="text"
                            name="name"
                            value={name}
                            //onChange={(event) => { setData({ ...data, name: event.target.value }) }}
                            onChange={handleNameChange}
                            required
                            maxLength={50}
                            aria-describedby="inputGroupPrepend"
                        />
                        <div className="invalid-feedback text-danger mt-2 text-start">
                            <i className="bi bi-exclamation-triangle-fill m-2"></i>El nombre es obligatorio y no debe sobrepasar los 50 caracteres.
                        </div>
                        {nameWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{nameWarning}</div>}
                    </div>
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
                    <label className="form-label fw-bold container text-start p-0" htmlFor="password">Contraseña</label>
                    <div className="position-relative">
                        <div className="input-group has-validation">
                            <input
                                className="form-control border border-dark-subtle"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                //onChange={(event) => { setData({ ...data, password: event.target.value }) }}
                                onChange={handlePasswordChange}
                                required
                                maxLength={30}
                                aria-describedby="validationTooltipPasswordPrepend"
                            />
                            <span className="input-group-text border border-dark-subtle" id="validationTooltipPasswordPrepend">
                                <button
                                    type="button"
                                    className="btn btn-light btn-eye p-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <i className="bi bi-eye-slash-fill"></i> // Icon for hidden password
                                    ) : (
                                        <i className="bi bi-eye-fill"></i> // Icon for visible password
                                    )}
                                </button>
                            </span>
                            <div className="invalid-feedback text-danger mt-2 text-start">
                                <i className="bi bi-exclamation-triangle-fill m-2"></i>La contraseña es obligatoria y no debe sobrepasar los 30 caracteres.
                            </div>
                            {passwordWarning && <div className="text-primary mt-2 text-start"><i className="bi bi-info-circle-fill me-2"></i>{passwordWarning}</div>}
                        </div>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="roles">Rol</label>
                    <select
                        className="form-select border border-dark-subtle"
                        name="roles"
                        value={role ? role.id_role : ''}
                        onChange={(event) => {
                            const selectedRole = roles.find(r => r.id_role === parseInt(event.target.value));
                            setData({ ...data, role: selectedRole });
                        }}
                        required
                    >
                        <option value="" className="bg-secondary-subtle">Seleccione un rol...</option>
                        {roles.map((role) => (
                            <option key={role.id_role} value={role.id_role}>{role.role}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El rol es obligatorio.
                    </div>
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

