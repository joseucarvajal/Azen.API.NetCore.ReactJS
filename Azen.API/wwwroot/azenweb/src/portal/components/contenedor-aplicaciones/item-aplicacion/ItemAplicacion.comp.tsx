import React from 'react';
import { Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ListItem } from 'react-bootstrap/lib/Media';
import { Aplicacion } from '../../../models/grupo-aplicaciones/Aplicacion';
import './item-aplicacion.style.css';

type AplicacionProps = {
    aplicacion: Aplicacion;
};

const ItemAplicacion: React.FC<AplicacionProps> = (props) => {
    return (
        <div className="list-group lista-horizontal ">
          <ListGroupItem className="item-aplicacion">
            <ListItem className="item-titulo">
            <Glyphicon glyph="stats" className="item-icono-app"/>
              {props.aplicacion.descr}
            </ListItem>
          </ListGroupItem>
      </div>
    )
};
export default ItemAplicacion;
