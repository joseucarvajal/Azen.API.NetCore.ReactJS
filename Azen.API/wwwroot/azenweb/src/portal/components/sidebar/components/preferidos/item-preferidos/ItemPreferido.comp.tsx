import React from "react";
import {
  Button,
  Col,
  Glyphicon,
  Grid,
  ListGroup,
  ListGroupItem,
  NavItem,
  Row,
} from "react-bootstrap";
import { ListItem } from "react-bootstrap/lib/Media";
import { IZLoginModule } from "../../../../../../modules/zcommon/contracts";
import { OpcionPreferido } from "../../../../../models/opciones-preferidas/OpcionPreferido";
import "./item-preferido.style.css";

type PreferidoProps = {
  preferido: OpcionPreferido;
  zLoginModule: IZLoginModule;
};

const ItemPreferido: React.FC<PreferidoProps> = (props) => {
  return (
    <ListGroup componentClass="ul">
      <ListGroupItem className="sidebar-item">
        <NavItem className="item-titulo"
           href={`?idApl=${props.preferido.apl}&opcion=${props.preferido.opc}&tkna=${props.zLoginModule.tkna}`}
           target="_blank"
        >
          <Glyphicon glyph="star" className="item-icono"/>
          {props.preferido.descrOpc}
        </NavItem>
      </ListGroupItem>
    </ListGroup>
  );
};
export default ItemPreferido;
