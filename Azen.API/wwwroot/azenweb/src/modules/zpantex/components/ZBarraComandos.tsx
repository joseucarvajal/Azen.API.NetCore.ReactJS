import * as React from 'react';

import {
    ButtonToolbar,
    Button,
    Well,
} from 'react-bootstrap';

import {
    IZComandoFormaState
} from "../../zcommon";

import { Services } from "../services";
import { ZProcesandoNoModalContainer } from "../../zaplicacion/containers/ZProcesandoNoModalContainer";
import { ZButtonComando } from './ZButtonComando';

export interface OwnProperties {
    zComandosList: Array<IZComandoFormaState>,
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    despacharComandoLineaEstado : (zcomandoFormaState: IZComandoFormaState)=> void;
}

export class ZBarraComandos extends React.PureComponent<OwnProperties & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProperties & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharComandoLineaEstado = this.despacharComandoLineaEstado.bind(this);
    }

    public render(): any {
        const { zComandosList } = this.props;
        let zPantexServies = new Services.ZRecursoServices();
        return (
            <Well bsSize="small">
                <div className="zaplicacion-zprocesando-no-modal-loader">
                    <ButtonToolbar>
                        {zComandosList.map((zComandoI: IZComandoFormaState, index: number) => {
                            return (
                                <ZButtonComando
                                    key={zComandoI.id}
                                    zComando={zComandoI}
                                    despacharComandoLineaEstado={this.despacharComandoLineaEstado}
                                >
                                </ZButtonComando>);
                            /*
                            return (
                                <Button
                                    key={zComandoI.id}
                                    title={zComandoI.etq}
                                    disabled={zComandoI.desh == 1}
                                    onClick={() => this.despacharComandoLineaEstado(zComandoI)}
                                >
                                    {(!zcomandoInfo.icono) &&
                                        zComandoI.etq
                                    }                                    
                                    <span className={zcomandoInfo.icono} aria-hidden="true"></span>
                                </Button>
                            );
                            */
                        })}
                    </ButtonToolbar>
                    <ZProcesandoNoModalContainer />
                </div>
            </Well>
        );
    }

    despacharComandoLineaEstado(zComando: IZComandoFormaState) {
        this.props.despacharComandoLineaEstado(zComando);
    }
}
