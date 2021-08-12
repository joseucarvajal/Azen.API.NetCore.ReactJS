import * as React from "react";
import { useState } from "react";
import {
  Button,
  Dropdown,
  Glyphicon,
  MenuItem,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  NavItem,
} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/lib/NavbarCollapse";
import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import NavbarToggle from "react-bootstrap/lib/NavbarToggle";
import { Link, NavLink } from "react-router-dom";
import { IZLoginModule } from "../../../modules/zcommon";
import { useDatosIniciales } from "../../hooks/datos-iniciales/useDatos.hook";
import { useOpcionesSoporte } from "../../hooks/opciones-soporte/useOpcionesSoporte.hook";
import ItemFrecuente from "../sidebar/components/frecuentes/item-frecuente/ItemFrecuente.comp";
import ItemPreferido from "../sidebar/components/preferidos/item-preferidos/ItemPreferido.comp";
import ListaPreferidos from "../sidebar/components/preferidos/lista-preferidos/ListaPreferidos.comp";
import { SidebarComp } from "../sidebar/sidebar/Sidebar.comp";
import { ItemSoporte } from "./components/ItemSoporte.comp";
import "./nav-bar.style.css";

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}

export const NavBarComp: React.FC<ConnectedState> = (props) => {
  const { data: respuesta } = useDatosIniciales();

  const { data: respuestaSoporte } = useOpcionesSoporte();

  return (
    <Navbar className="navbar" fixedTop={true}>
      <NavbarHeader>
        <NavbarBrand>
          <img
            className="logo-azen"
            src="https://github.com/marcelaTrujilloToro/loteriApp.ionic.react/blob/main/public/assets/img/splash/LoteriApp_azen_96x30.png?raw=true"
          ></img>
        </NavbarBrand>
        <NavbarToggle />
      </NavbarHeader>

      <NavbarCollapse>
        <Nav className="navbar-cliente">
          <div className="datos-cliente">
            <Navbar.Text className="navbar-text">
              {props.zLoginModule.zAplList.datosIniciales.cliente}
            </Navbar.Text>
            <img
              className="logo-cliente"
              src={props.zLoginModule.zAplList.datosIniciales.logoCliente}
              alt="logo cliente"
            ></img>
          </div>
        </Nav>

        <Nav pullRight>
        <NavDropdown title="Opciones preferidas"  id="dropdown-opciones-pref" className="hidden-sm hidden-md hidden-lg">
           {
             props.zLoginModule.zAplList.opcionesPreferidas.map((opcionPreferida) => {
               return(
                 <ItemPreferido
                  key={opcionPreferida.opc}
                  preferido={opcionPreferida}
                  zLoginModule={props.zLoginModule}
                 >

                 </ItemPreferido>
               )
             })
           }

          </NavDropdown>
          <NavDropdown title="Opciones frecuentes"  id="dropdown-opciones-frec" className="hidden-sm hidden-md hidden-lg">
           {
             props.zLoginModule.zAplList.opcionesFrecuentes.map((opcionFrecuente) => {
               return(
                 <ItemFrecuente
                  key={opcionFrecuente.opc}
                  frecuente={opcionFrecuente}
                  zLoginModule={props.zLoginModule}
                 >

                 </ItemFrecuente>
               )
             })
           }

          </NavDropdown>
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


      </NavbarCollapse>
    </Navbar>
  );
};
