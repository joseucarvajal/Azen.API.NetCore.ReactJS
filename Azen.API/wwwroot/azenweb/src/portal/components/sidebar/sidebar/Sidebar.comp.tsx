import * as React from "react";
import { useOpcionesFrecuentes } from "../../../hooks/opciones-frecuentes/useOpcionesFrecuentes.hook";
import { useOpcionesPreferidas } from "../../../hooks/opciones-preferidas/useOpcionesPreferidas.hook";
import  ListaFrecuente  from "../components/frecuentes/lista-frecuente/ListaFrecuente.comp";
import ListaPreferidos from "../components/preferidos/lista-preferidos/ListaPreferidos.comp";
import "./sidebar.style.css";

export const SidebarComp = () => {

  const {data: respuestaOpcionesFrecuentes} = useOpcionesFrecuentes();
  const {data: respuestaOpcionesPreferidas} = useOpcionesPreferidas();
  
  return (
    <aside className="sidebar" >
     
      <div className="sidebar-navbar">
         <div>
           <ListaPreferidos listaPreferidos={respuestaOpcionesPreferidas}/>
         </div>
         <hr className="divider-sidebar"/>
         <div>
           <ListaFrecuente listaFrecuentes={respuestaOpcionesFrecuentes}/>
         </div>
      </div>
     

      
    </aside>
  );
};
