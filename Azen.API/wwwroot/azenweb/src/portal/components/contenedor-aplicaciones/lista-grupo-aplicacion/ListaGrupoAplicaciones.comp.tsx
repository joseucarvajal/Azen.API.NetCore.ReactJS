import React, { Fragment } from "react";
import { Col, Glyphicon, Grid, Row } from "react-bootstrap";
import { IZLoginModule } from "../../../../modules/zcommon/contracts";
import { GruposAplicaciones } from "../../../models/grupo-aplicaciones/GrupoAplicaciones";
import { ListaAplicaciones } from "../lista-aplicaciones/ListaAplicaciones.comp";
import './lista-grupo-aplicaciones.style.css';


type ListaGrupoAplicacionesProps = {
  listaGrupoAplicaciones: GruposAplicaciones[] | undefined;
  zLoginModule: IZLoginModule;
};

export const ListaGrupoAplicaciones: React.FC<ListaGrupoAplicacionesProps> = (
  props
) => {
  if (props.listaGrupoAplicaciones === undefined) {
    return <h3>No hay grupos de aplicaciones</h3>;
  } else {
    return (
      <Grid className="grid-lista-grupo-app">
        {props.listaGrupoAplicaciones.map((grupoAplicaciones) => {
          return (
            <Row key={grupoAplicaciones.area}>
              <Col>
                <div className="div-nombre-area">
                <Glyphicon glyph="list-alt" className="icono-area"/>
                  <h4>{grupoAplicaciones.area}</h4>
                </div>
                <ListaAplicaciones
                  listaAplicaciones={grupoAplicaciones.aplicaciones}
                  zLoginModule={props.zLoginModule}
                />
                <hr/>
              </Col>
            </Row>
          );
        })}
      </Grid>
    );
  }
};
