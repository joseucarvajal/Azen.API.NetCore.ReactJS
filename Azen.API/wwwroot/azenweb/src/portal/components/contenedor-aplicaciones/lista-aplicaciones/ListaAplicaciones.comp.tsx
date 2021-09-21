import React from 'react';
import { IZLoginModule } from '../../../../modules/zcommon';
import { Aplicacion } from '../../../models/grupo-aplicaciones/Aplicacion';
import ItemAplicacion from '../item-aplicacion/ItemAplicacion.comp';
import './lista-aplicaciones.style.css';

type ListaAplicacionesProps = {
    listaAplicaciones: Aplicacion[] | undefined;
    zLoginModule: IZLoginModule;
};

export const ListaAplicaciones: React.FC <ListaAplicacionesProps> = (props) => {

    if (props.listaAplicaciones === undefined || props.listaAplicaciones.length === 0) {
        return (
          <div className="lista-vacia">
            <h4>No hay aplicaciones disponibles</h4>
          </div>
        );
      } else {
        return (
         
            <div className="list-group grid-lista-aplicaciones">
              {props.listaAplicaciones.map((aplicacion) => {
                return (
                  <ItemAplicacion
                    key={aplicacion.apl}
                    aplicacion={aplicacion}
                    zLoginModule={props.zLoginModule}
                  />
                );
              })}
            </div>
        );
      }
}
