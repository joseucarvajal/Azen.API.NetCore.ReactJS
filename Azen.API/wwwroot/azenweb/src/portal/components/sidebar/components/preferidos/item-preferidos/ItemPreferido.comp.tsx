import React from "react";
import {
  Glyphicon,
  ListGroup,
  ListGroupItem,
  NavItem,
} from "react-bootstrap";
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
