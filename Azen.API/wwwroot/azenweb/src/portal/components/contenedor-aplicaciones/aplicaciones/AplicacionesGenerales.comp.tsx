import React from 'react';
import { IZLoginModule } from '../../../../modules/zcommon';
import { ListaGrupoAplicaciones } from '../lista-grupo-aplicacion/ListaGrupoAplicaciones.comp';
import './aplicaciones-generales.style.css';

export interface ConnectedState {
    zLoginModule: IZLoginModule;
}

export const AplicacionesGenerales: React.FC <ConnectedState> = (props) => {

    
   if (props.zLoginModule.zAplList.gruposAplicaciones === undefined) {
       return(
           <div className="contenedor-principal">
               <h3>No hay aplicaciones disponibles</h3>
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
