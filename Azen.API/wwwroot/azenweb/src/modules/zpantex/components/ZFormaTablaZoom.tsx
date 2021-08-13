import * as React from 'react';

import {
    Table,
    Glyphicon,
    Button
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
} from "../../zcommon";

import {
    IZComandoFormaState,
} from '../../zcommon/contracts';

import { 
    IZFormaTablaState, 
    IZCampoState, 
    IZFilaCamposState 
} from "../../zcommon";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedDispatch {
    onFilaMultiSeleccionada:
    (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => void;

    onCampoFocusIrACmp: (zcampoState: IZCampoState) => void;

    despacharComando: (zcomandoFormaState: IZComandoFormaState) => void;

    seleccionarFila: (indexFila: number) => void;
}

export interface ConnectedState {
}


export class ZFormaTablaZoom extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    private primeraFilaSeleccionada: boolean = false;

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.onCampoClick = this.onCampoClick.bind(this);
        this.onCampoTituloClick = this.onCampoTituloClick.bind(this);
    }

    render(): any {
        return (
            <Table striped condensed hover responsive>
                <thead>
                    <tr>
                        <td>&nbsp;</td>
                        {this.props.zFormaTabla.filasCamposList[0].cmpsState.map((zcampoI: IZCampoState, index: number) => {
                            return (
                                <th
                                    key={index}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.onCampoTituloClick(zcampoI)}
                                >
                                    {(zcampoI.autoFocus) &&
                                        <span
                                            onClick={(e: any) => {
                                                e.stopPropagation();
                                                this.props.despacharComando({
                                                    cmd: ZCommonConstants.ComandoEnum.CM_BUSCAR,
                                                    px: zcampoI.px,
                                                    idZft: zcampoI.idZft
                                                } as IZComandoFormaState);
                                            }}
                                        >
                                            <Glyphicon
                                                style={{
                                                    color: "rgb(51, 122, 183)",
                                                    marginRight: "3px"
                                                }}
                                                glyph="search"
                                            /> {zcampoI.etq}
                                        </span>
                                    }
                                    {(!zcampoI.autoFocus) &&
                                        <span>{zcampoI.etq}</span>
                                    }
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
                                    style={{
                                        backgroundColor: this.props.zFormaTabla.indexFilaMultiSeleccionada == indexFila ? "#7dc67d" : "",
                                        cursor: "pointer"
                                    }}
                                    className="azn-seleccionar"
                                >
                                    <td>
                                        <Button
                                            bsSize="xsmall"
                                            title="Seleccionar"
                                            onClick={(e: any) => {
                                                this.onSeleccionarFila(indexFila);
                                            }}
                                        >
                                            <Glyphicon glyph="ok" />
                                        </Button>
                                    </td>
                                    {zfilaCampoState.cmpsState.map((zcampoI: IZCampoState, indexCampo: number) => {
                                        return (
                                            <td
                                                key={indexCampo}
                                                onClick={(e: any) => {
                                                    if (e.target.tagName.toUpperCase() == 'INPUT') {
                                                        return;
                                                    }
                                                    this.onCampoClick(indexFila, this.props.zFormaTabla.filasCamposList[0].cmpsState[indexCampo])
                                                }
                                                }
                                                ref={(ref) => {
                                                    //jcarvajal: Antes se enviaba seleccionar fila desde el cliente
                                                    //Ahora lo resuelve Azen enviando el CMD IR_ALINEA
                                                    /*
                                                    if (ref && indexFila == 0 && indexCampo == 0) {
                                                        if (!this.primeraFilaSeleccionada) {
                                                            this.primeraFilaSeleccionada = true;
                                                            ref.click();
                                                        }
                                                    }
                                                    */
                                                }}
                                            >
                                                {zcampoI.value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        );
    }

    onCampoTituloClick(zcampoI: IZCampoState) {
        this.props.onCampoFocusIrACmp(zcampoI);
    }


    onCampoClick(indexFila: number, zcampoI: IZCampoState) {

        this.props.onCampoFocusIrACmp(zcampoI);

        if (indexFila == this.props.zFormaTabla.indexFilaMultiSeleccionada) {
            return;
        }

        this.props.onFilaMultiSeleccionada(this.props.zFormaTabla, indexFila);
    }

    onSeleccionarFila(indexFila: number) {
        this.props.seleccionarFila(indexFila);
    }
}