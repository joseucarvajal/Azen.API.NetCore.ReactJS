import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { AplicacionesGenerales } from "../../components/contenedor-aplicaciones/aplicaciones/AplicacionesGenerales.comp";
import { NavBarComp } from "../../components/nav-bar/NavBar.comp";
import { SidebarComp } from "../../components/sidebar/sidebar/Sidebar.comp";
import "./portal.style.css";

const Portal = () => {
  return (
    <Grid className="grid-home">
      <Row className="row-navbar">
        <Col>
          <NavBarComp />
        </Col>
      </Row>

      <Row >
        <Col sm={5} md={3}  className="hidden-xs">
          <SidebarComp />
        </Col>
        <Col sm={7} md={9}  className="col-aplicaciones">
          <AplicacionesGenerales/>
        </Col>
      </Row>
    </Grid>
  );
};
export default Portal;
