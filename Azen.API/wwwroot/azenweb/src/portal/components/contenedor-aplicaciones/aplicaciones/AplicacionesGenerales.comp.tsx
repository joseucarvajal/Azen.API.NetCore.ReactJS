import React from 'react';
import { useGrupoAplicaciones } from '../../../hooks/grupos-aplicaciones/useGrupoAplicaciones.hook';
import { ListaGrupoAplicaciones } from '../lista-grupo-aplicacion/ListaGrupoAplicaciones.comp';
import './aplicaciones-generales.style.css';

export const AplicacionesGenerales = () => {

    const {data: respuesta} = useGrupoAplicaciones();

    
   if (respuesta === undefined) {
       return(
           <div className="contenedor-principal">
               <h3>No hay aplicaciones disponibles</h3>
           </div>
       )
   }else{
       return(
            <div className="contenedor-principal">
                <h3 className="titulo-principal">APLICACIONES</h3>
                <ListaGrupoAplicaciones listaGrupoAplicaciones={respuesta}/>
            </div>
       )
   }
}
