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
import { IZLoginModule } from "../../../modules/zcommon";
import { useDatosIniciales } from "../../hooks/datos-iniciales/useDatos.hook";
import { useOpcionesSoporte } from "../../hooks/opciones-soporte/useOpcionesSoporte.hook";
import { ItemSoporte } from "./components/ItemSoporte.comp";
import "./nav-bar.style.css";

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}


export const NavBarComp: React.FC <ConnectedState> = (props) => {
  

  const { data: respuesta } = useDatosIniciales();

  const { data: respuestaSoporte } = useOpcionesSoporte();

  return (
    <Navbar className="navbar" fixedTop={true}>
      <Nav className="navbar-cliente">
        <img className="logo-azen" src="https://github.com/marcelaTrujilloToro/loteriApp.ionic.react/blob/main/public/assets/img/splash/LoteriApp_azen_96x30.png?raw=true"></img>
        <Navbar.Toggle />
        <div className="datos-cliente">
          <Navbar.Text className="navbar-text">{props.zLoginModule.zAplList.datosIniciales.cliente}</Navbar.Text>
          <img
            className="logo-cliente"
            src={props.zLoginModule.zAplList.datosIniciales.logoCliente}
            alt="logo cliente"
          ></img>
        </div>
        
      </Nav>

      <Nav pullRight>
      <NavDropdown title="Soporte" id="nav-dropdown" pullRight>
          {props.zLoginModule.zAplList.soporte.map((opcionSoporte) => {
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
