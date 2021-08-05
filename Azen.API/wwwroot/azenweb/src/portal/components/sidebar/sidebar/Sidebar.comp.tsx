import * as React from "react";
import { IZLoginModule } from "../../../../modules/zcommon";
import { useOpcionesFrecuentes } from "../../../hooks/opciones-frecuentes/useOpcionesFrecuentes.hook";
import { useOpcionesPreferidas } from "../../../hooks/opciones-preferidas/useOpcionesPreferidas.hook";
import  ListaFrecuente  from "../components/frecuentes/lista-frecuente/ListaFrecuente.comp";
import ListaPreferidos from "../components/preferidos/lista-preferidos/ListaPreferidos.comp";
import "./sidebar.style.css";

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}

export const SidebarComp: React.FC <ConnectedState> = (props) => {

  const {data: respuestaOpcionesFrecuentes} = useOpcionesFrecuentes();
  const {data: respuestaOpcionesPreferidas} = useOpcionesPreferidas();
  
  return (
    <aside className="sidebar" >
     
      <div className="sidebar-navbar">
         <div>
           <ListaPreferidos listaPreferidos={props.zLoginModule.zAplList.opcionesPreferidas}/>
         </div>
         <hr className="divider-sidebar"/>
         <div>
           <ListaFrecuente listaFrecuentes={props.zLoginModule.zAplList.opcionesFrecuentes}/>
         </div>
      </div>
     

      
    </aside>
  );
};
