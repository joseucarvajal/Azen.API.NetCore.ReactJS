import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { AplicacionesContainer } from "../../components/contenedor-aplicaciones/aplicaciones/AplicacionesContainer";
import { NavbarContainer } from "../../components/nav-bar/NavbarContainer";
import { SidebarContainer } from "../../components/sidebar/sidebar/SidebarContainer";
import "./portal.style.css";


const Portal = () => {
  return (
    <Grid className="grid-home zportal">
      <Row className="row-navbar">
        <Col>
          <NavbarContainer/>
        </Col>
      </Row>

      <Row >
        <Col sm={5} md={3}  className="hidden-xs">
          <SidebarContainer/>
        </Col>
        <Col sm={7} md={9}  className="col-aplicaciones">
          <AplicacionesContainer/>
        </Col>
      </Row>
    </Grid>
  );
};
export default Portal;