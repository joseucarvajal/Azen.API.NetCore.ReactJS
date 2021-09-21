import React from 'react';
import { IZLoginModule } from '../../../../modules/zcommon';
import { ListaGrupoAplicaciones } from '../lista-grupo-aplicacion/ListaGrupoAplicaciones.comp';
import './aplicaciones-generales.style.css';

export interface ConnectedState {
    zLoginModule: IZLoginModule;
}

export const AplicacionesGenerales: React.FC <ConnectedState> = (props) => {

    
   if (props.zLoginModule.zAplList.gruposAplicaciones === undefined || props.zLoginModule.zAplList.gruposAplicaciones.length === 0) {
       return(
           <div className="contenedor-principal">
               <h3 className="titulo-principal">APLICACIONES</h3>
               <h4>No hay aplicaciones disponibles</h4>
           </div>
       )
   }else{
       return(
            <div className="contenedor-principal">
                <h3 className="titulo-principal">APLICACIONES</h3>
                <ListaGrupoAplicaciones listaGrupoAplicaciones={props.zLoginModule.zAplList.gruposAplicaciones} zLoginModule={props.zLoginModule}/>
            </div>
       )
   }
}
