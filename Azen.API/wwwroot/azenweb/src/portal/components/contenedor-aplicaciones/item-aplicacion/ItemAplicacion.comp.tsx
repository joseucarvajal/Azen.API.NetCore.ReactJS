import React from 'react';
import { Glyphicon, ListGroup, ListGroupItem, NavItem } from 'react-bootstrap';
import { ListItem } from 'react-bootstrap/lib/Media';
import { IZLoginModule } from '../../../../modules/zcommon';
import { Aplicacion } from '../../../models/grupo-aplicaciones/Aplicacion';
import './item-aplicacion.style.css';

type AplicacionProps = {
    aplicacion: Aplicacion;
    zLoginModule: IZLoginModule;
};


const ItemAplicacion: React.FC<AplicacionProps> = (props) => {

  
    return (
        <div className="list-group lista-horizontal ">
          <ListGroupItem className="item-aplicacion">
            <NavItem 
              className="item-apl-titulo"
              href={`?idApl=${props.aplicacion.apl}&nomApl=${props.aplicacion.descr}&lanzarMenu=1&tkna=${props.zLoginModule.tkna}`}
              target="_blank"
            >
            
            <Glyphicon glyph="stats" className="item-icono-app"/>
              {props.aplicacion.descr}

            </NavItem>
          </ListGroupItem>
      </div>
    )
};
export default ItemAplicacion;
