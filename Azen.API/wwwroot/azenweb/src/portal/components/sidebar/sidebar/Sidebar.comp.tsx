import * as React from "react";
import { IZLoginModule } from "../../../../modules/zcommon";
import  ListaFrecuente  from "../components/frecuentes/lista-frecuente/ListaFrecuente.comp";
import ListaPreferidos from "../components/preferidos/lista-preferidos/ListaPreferidos.comp";
import "./sidebar.style.css";

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}

export const SidebarComp: React.FC <ConnectedState> = (props) => {

  return (
    <aside className="sidebar" >
      <div className="sidebar-navbar">
         <div>
           <ListaPreferidos listaPreferidos={props.zLoginModule.zAplList.opcionesPreferidas} zLoginModule={props.zLoginModule}/>
         </div>
         <hr className="divider-sidebar"/>
         <div>
           <ListaFrecuente listaFrecuentes={props.zLoginModule.zAplList.opcionesFrecuentes} zLoginModule={props.zLoginModule} />
         </div>
      </div>
    </aside>
  );
};
