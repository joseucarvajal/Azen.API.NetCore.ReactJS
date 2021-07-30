import * as React from "react";
import { useState } from "react";
import {
  Button,
  Dropdown,
  Glyphicon,
  MenuItem,
  Nav,
  Navbar,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useDatosIniciales } from "../../hooks/datos-iniciales/useDatos.hook";
import { useOpcionesSoporte } from "../../hooks/opciones-soporte/useOpcionesSoporte.hook";
import { ItemSoporte } from "./components/ItemSoporte.comp";
import "./nav-bar.style.css";

export const NavBarComp = () => {
  const [sidebar, setSidebar] = useState(false);

  const verSidebar = () => setSidebar(!sidebar);

  const { data: respuesta } = useDatosIniciales();

  const { data: respuestaSoporte } = useOpcionesSoporte();

  return (
    <Navbar className="navbar" fixedTop={true}>
      <Nav className="navbar-cliente">
        <img className="logo-azen" src="https://github.com/marcelaTrujilloToro/loteriApp.ionic.react/blob/main/public/assets/img/splash/LoteriApp_azen_96x30.png?raw=true"></img>
        <Navbar.Toggle />
        <div className="datos-cliente">
          <Navbar.Text className="navbar-text">{respuesta?.cliente}</Navbar.Text>
          <img
            className="logo-cliente"
            src={respuesta?.logoCliente}
            alt="logo cliente"
          ></img>
        </div>
        
      </Nav>

      <Nav pullRight>
      <NavDropdown title="Soporte" id="nav-dropdown" pullRight>
          {respuestaSoporte?.map((opcionSoporte) => {
            return (
              <ItemSoporte
                key={opcionSoporte.opc}
                opcionSoporte={opcionSoporte}
              />
            );
          })}
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
