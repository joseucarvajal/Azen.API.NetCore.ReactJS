import React from "react";
import { Grid } from "react-bootstrap";
import { OpcionPreferido } from "../../../../../models/opciones-preferidas/OpcionPreferido";
import ItemPreferido from "../item-preferidos/ItemPreferido.comp";
import "./lista-preferidos.style.css";

type ListaPreferidasProps = {
  listaPreferidos: OpcionPreferido[] | undefined;
};

const ListaPreferidos: React.FC<ListaPreferidasProps> = (props) => {
  if (props.listaPreferidos === undefined) {
    return (
      <div className="lista-vacia">
        <h3>Opciones preferidas</h3>
        <h4 className="fuente-h4">No hay opciones preferidas</h4>
      </div>
    );
  } else {
    return (
      <div>
        <h4> Opciones preferidas</h4>
        <Grid className="grid-preferidos">
          {props.listaPreferidos.map((opcionPreferida) => {
            return (
              <ItemPreferido
                key={opcionPreferida.opc}
                preferido={opcionPreferida}
              />
            );
          })}
        </Grid>
      </div>
    );
  }
};
export default ListaPreferidos;
