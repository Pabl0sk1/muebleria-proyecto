import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useState } from 'react'
import { UserApp } from './components/Usuario/UserApp.jsx'
import { CustomerApp } from './components/Cliente/CustomerApp.jsx'
import { ProductApp } from './components/Producto/ProductApp.jsx'
import { SaleApp } from './components/Venta/SaleApp.jsx'
import { RoleApp } from './components/Rol/RoleApp.jsx'
import { TypeApp } from './components/Tipo/TypeApp.jsx'
import { PaymentApp } from './components/Pago/PaymentApp.jsx'
import Carousel from './Carousel.jsx'
import './App.css'

export const App = () => {

  const [dropdown, setDropdown] = useState(false);

  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown);
  }

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg text-bg-primary p-2 ps-5 pe-5 z-3 top-0 position-fixed w-100 border-bottom border-4 border-black rounded-bottom-3">
          <div className="container-fluid p-0 m-0">
            <NavLink className="inicioHome" to=""><i className="bi bi-house-fill pe-2"></i>Inicio</NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><NavLink className="nav-link" to="/users"><i className="bi bi-person-fill pe-2"></i>Usuarios</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/customers"><i className="bi bi-people-fill pe-2"></i>Clientes</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/products"><i className="bi bi-box-seam-fill pe-2"></i>Productos</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/sales"><i className="bi bi-cart-fill pe-2"></i>Ventas</NavLink></li>
                <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
                  <DropdownToggle className="drop"><i className="bi bi-list p-0 m-0"></i></DropdownToggle>
                  <DropdownMenu className="p-0">
                    <DropdownItem className="nav-item p-0 rounded-2 bg-body">
                      <NavLink className="nav-link dropdw rounded-top-1 ps-3" to="/roles"><i className="bi bi-diagram-2-fill pe-2"></i>Roles</NavLink>
                    </DropdownItem>
                    <DropdownItem className="nav-item p-0 rounded-2 bg-body">
                      <NavLink className="nav-link dropdw rounded-bottom-1 ps-3" to="/types"><i className="bi bi-inboxes-fill pe-2"></i>Tipos</NavLink>
                    </DropdownItem>
                    <DropdownItem className="nav-item p-0 rounded-2 bg-body">
                      <NavLink className="nav-link dropdw rounded-bottom-1 ps-3" to="/payments"><i className="bi bi-credit-card-fill pe-2"></i>Pagos</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="" element={<Carousel />} />
          <Route path="/users" element={<UserApp />} />
          <Route path="/customers" element={<CustomerApp />} />
          <Route path="/products" element={<ProductApp />} />
          <Route path="/sales" element={<SaleApp />} />
          <Route path="/roles" element={<RoleApp />} />
          <Route path="/types" element={<TypeApp />} />
          <Route path="/payments" element={<PaymentApp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
