import React from "react";
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
import { OpcionPreferido } from "../../../../../models/opciones-preferidas/OpcionPreferido";
import "./item-preferido.style.css";

type PreferidoProps = {
  preferido: OpcionPreferido;
};

const ItemPreferido: React.FC<PreferidoProps> = (props) => {
  return (
    <ListGroup componentClass="ul">
      <ListGroupItem className="sidebar-item">
        <ListItem className="item-titulo">
          <Glyphicon glyph="star" className="item-icono"/>
          {props.preferido.descrOpc}
        </ListItem>
      </ListGroupItem>
    </ListGroup>
  );
};
export default ItemPreferido;
