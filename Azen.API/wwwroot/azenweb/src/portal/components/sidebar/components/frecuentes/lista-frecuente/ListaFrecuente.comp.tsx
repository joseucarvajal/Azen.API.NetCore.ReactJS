import * as React from "react";
import { Grid } from "react-bootstrap";
import { IZLoginModule } from "../../../../../../modules/zcommon/contracts";
import { OpcionFrecuente } from "../../../../../models/opciones-frecuentes/OpcionFrecuente";
import  ItemFrecuente  from "../item-frecuente/ItemFrecuente.comp";
import './lista-frecuentes.style.css';

type ListaFrecuentesProps = {
    listaFrecuentes: OpcionFrecuente[] | undefined;
    zLoginModule: IZLoginModule;
}

const ListaFrecuente: React.FC <ListaFrecuentesProps> = (props) => {
    
    if (props.listaFrecuentes === undefined) {
            return(

                <div className="lista-vacia">
                     <h3>Opciones frecuentes</h3>
                     <h4 className="fuente-h4">No hay opciones frecuentes</h4>
                </div>
            )
    }
    else {
        return (
            <div>
                <h4> Opciones frecuentes</h4>
                <Grid className="grid-frecuentes">
                    {props.listaFrecuentes.map((opcionFrecuente) => {
                        return <ItemFrecuente key={opcionFrecuente.opc} frecuente={opcionFrecuente} zLoginModule={props.zLoginModule}/>
                    })}   
                </Grid>    
            </div>
        )
    }
    
};

export default ListaFrecuente;
