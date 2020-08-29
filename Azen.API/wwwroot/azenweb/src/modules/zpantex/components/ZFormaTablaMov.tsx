import * as React from 'react';

import {
    Table
} from 'react-bootstrap';

import { 
    IZFormaTablaState, 
    IZCampoState, 
    IZFilaCamposState, 
    Constants as ZCommonConstants } from "../../zcommon";

import ZCampo from "./ZCampo";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
    tipoCmdPantex:ZCommonConstants.ComandoEnum;
}

export interface ConnectedDispatch {
    onFilaMultiSeleccionada:
    (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => void;
}

export interface ConnectedState {
}


export class ZFormaTablaMov extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.onFilaClick = this.onFilaClick.bind(this);
    }

    render(): any {
        
        return (
            <div style={{
                overflowX: "auto"
            }}>
                <Table className="azen-tabla-mov">
                    <thead>
                        <tr>
                            {this.props.zFormaTabla.filasCamposList[0].cmpsState.map((zcampoI: IZCampoState, index: number) => {
                                return (
                                    <th key={index}>
                                        {zcampoI.etq}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.zFormaTabla.filasCamposList.map((zfilaCampoState: IZFilaCamposState, indexFila: number) => {
                            if (indexFila < this.props.zFormaTabla.numFilasVisiblesMulti) {
                                return (
                                    <tr
                                        key={indexFila}
                                        onClickCapture={() => this.onFilaClick(indexFila)}
                                    >
                                        {zfilaCampoState.cmpsState.map((zcampoI: IZCampoState, indexCampo: number) => {
                                            return (
                                                <td key={indexCampo}>
                                                    <ZCampo
                                                        zCampo={zcampoI}
                                                        zFormaTabla={this.props.zFormaTabla}
                                                        tipoCmdPantex={this.props.tipoCmdPantex}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

    onFilaClick(indexFila: number) {

        if (indexFila == this.props.zFormaTabla.indexFilaMultiSeleccionada) {
            return;
        }                

        this.props.onFilaMultiSeleccionada(this.props.zFormaTabla, indexFila);
    }
}