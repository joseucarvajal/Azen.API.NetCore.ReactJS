import * as React from "react";
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { ListItem } from "react-bootstrap/lib/Media";
import { OpcionFrecuente } from "../../../../../models/opciones-frecuentes/OpcionFrecuente";
import "./item-frecuente.style.css";

type FrecuenteProps = {
  frecuente: OpcionFrecuente;
};

const ItemFrecuente: React.FC<FrecuenteProps> = (props) => {
  return (
    <ListGroup componentClass="ul">
      <ListGroupItem  className="sidebar-item">
        <ListItem className="item-titulo">
        <Glyphicon glyph="retweet" className="item-icono"/>
          {props.frecuente.descrOpc}
        </ListItem>
      </ListGroupItem>
    </ListGroup>
  );
};
export default ItemFrecuente;
