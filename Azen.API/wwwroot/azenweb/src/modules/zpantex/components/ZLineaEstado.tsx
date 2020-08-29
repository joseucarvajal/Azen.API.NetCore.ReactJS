import * as React from 'react';

import {
    Button,
    ButtonGroup,
    Glyphicon
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    IZComandoFormaState, IZFormaTablaState
} from "../../zcommon";

import { Services } from "../services";

export interface OwnProperties {
    linEst: Array<IZComandoFormaState>;
    zFormaTablaState: IZFormaTablaState;
    tipoCmdPantex: ZCommon.Constants.ComandoEnum;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    despacharComandoLineaEstado: (zcomandoFormaState: IZComandoFormaState) => void;
}

export class ZLineaEstado extends React.PureComponent<OwnProperties & ConnectedState & ConnectedDispatch, undefined>
{

    constructor(props: OwnProperties & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharComandoLineaEstado = this.despacharComandoLineaEstado.bind(this);
    }

    public render(): any {
        const { linEst } = this.props;
        let zPantexServies = new Services.ZRecursoServices();
        return (
            <div
                style={{
                    marginBottom: "5px"
                }}
            >
                <ButtonGroup bsSize="small">
                    {linEst.map((zComandoI: IZComandoFormaState, index: number) => {
                        
                        if(zComandoI.cmd === ZCommon.Constants.ComandoEnum.CM_CERRAR) return;

                        const iconName = zPantexServies.getCMIcon(zComandoI);
                        return (
                            <Button
                                key={zComandoI.id}
                                bsStyle={this.props.zFormaTablaState.esRegionActiva ? "info" : "default"}
                                title={zComandoI.etq}
                                disabled={zComandoI.desh == 1}
                                onClick={() => this.despacharComandoLineaEstado(zComandoI)}
                            >
                                {(!iconName) &&
                                    zComandoI.etq
                                }
                                <span className={iconName} aria-hidden="true"></span>
                            </Button>
                        );
                    })}
                </ButtonGroup>
                {this.props.tipoCmdPantex == ZCommon.Constants.ComandoEnum.CM_PXCREARMOV 
                && this.props.zFormaTablaState.esRegionActiva
                    && (
                        <Glyphicon style={{ marginLeft: "10px", color: "#629261" }} glyph="ok-circle" />
                    )}
            </div>
        );
    }

    despacharComandoLineaEstado(zComando: IZComandoFormaState) {
        this.props.despacharComandoLineaEstado(zComando);
    }
}