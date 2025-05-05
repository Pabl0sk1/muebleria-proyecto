import { useEffect, useState } from "react"
import { getTypes } from "../../services/type.service.js";

export const ProductEdit = ({ productSelected, guardarFn }) => {

    const [types, setTypes] = useState([]);
    const [data, setData] = useState(productSelected);
    const [initialData] = useState(productSelected);
    const [nameWarning, setNameWarning] = useState('');

    const { id_product, name, stock, price, type } = data;

    const recuperarTypesConAxios = async () => {
        setTypes(await getTypes());
    }

    useEffect(() => {
        recuperarTypesConAxios();
    }, []);

    useEffect(() => {
        setData(productSelected);
    }, [productSelected]);

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

        // Validar que se haya seleccionado un tipo válido
        if (!data.type || data.type.id_type === '') {
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
                    <label className="form-label fw-bold container text-start p-0" htmlFor="id_product">ID</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="text"
                        name="id_product"
                        value={id_product}
                        //onChange={(event) => { setData({ ...data, id_product: event.target.value }) }}
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
                    <label className="form-label fw-bold container text-start p-0" htmlFor="stock">Stock</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="number"
                        name="stock"
                        value={stock}
                        onChange={(event) => { setData({ ...data, stock: event.target.value }) }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="price">Precio</label>
                    <input
                        className="form-control border border-dark-subtle"
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event) => { setData({ ...data, price: event.target.value }) }}
                    />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label fw-bold container text-start p-0" htmlFor="types">Tipo</label>
                    <select
                        className="form-select border border-dark-subtle"
                        name="types"
                        value={type ? type.id_type : ''}
                        onChange={(event) => {
                            const selectedType = types.find(t => t.id_type === parseInt(event.target.value));
                            setData({ ...data, type: selectedType });
                        }}
                        required
                    >
                        <option value="" className="bg-secondary-subtle">Seleccione un tipo...</option>
                        {types.map((type) => (
                            <option key={type.id_type} value={type.id_type}>{type.type}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback text-danger mt-2 text-start">
                        <i className="bi bi-exclamation-triangle-fill m-2"></i>El tipo es obligatorio.
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

