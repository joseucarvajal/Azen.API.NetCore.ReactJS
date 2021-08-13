import * as React from "react";
import {
  Glyphicon,
  ListGroup,
  ListGroupItem,
  NavItem,
} from "react-bootstrap";
import { IZLoginModule } from "../../../../../../modules/zcommon/contracts";
import { OpcionFrecuente } from "../../../../../models/opciones-frecuentes/OpcionFrecuente";
import "./item-frecuente.style.css";

type FrecuenteProps = {
  frecuente: OpcionFrecuente;
  zLoginModule: IZLoginModule;
};

const ItemFrecuente: React.FC<FrecuenteProps> = (props) => {
  return (
    <ListGroup componentClass="ul">
      <ListGroupItem  className="sidebar-item">
        <NavItem className="item-titulo"
           href={`?idApl=${props.frecuente.apl}&opcion=${props.frecuente.opc}&tkna=${props.zLoginModule.tkna}`}
           target="_blank"
        >
        <Glyphicon glyph="retweet" className="item-icono"/>
          {props.frecuente.descrOpc}
        </NavItem>
      </ListGroupItem>
    </ListGroup>
  );
};
export default ItemFrecuente;
