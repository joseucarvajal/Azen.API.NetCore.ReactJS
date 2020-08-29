import * as React from 'react';

import {
    Col,
    ControlLabel,
    Glyphicon
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZComandoFormaState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {

}

export interface ConnectedDispatch {
    despacharComando: (zcomandoFormaState: IZComandoFormaState) => void;
}

export class ZLabelCampo extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private etiquetasAIgnorar: Array<string>;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
        this.etiquetasAIgnorar = ["Que", "Por campo"];
    }

    render() {
        const { zCampoModel } = this.props;

        const activarBuscar = 
            zCampoModel.autoFocus
            && !zCampoModel.noArrivable
            && zCampoModel.etq.length > 0
            && this.etiquetasAIgnorar.indexOf(zCampoModel.etq.trim()) == -1;

        return (
            <Col componentClass={ControlLabel}>
                {(activarBuscar) &&
                    <span
                        style={{
                            cursor: "pointer"
                        }}
                        title={"Buscar por " + zCampoModel.etq}
                        onClick={() => {
                            this.props.despacharComando({
                                cmd: ZCommonConstants.ComandoEnum.CM_BUSCAR,
                                px: zCampoModel.px,
                                idZft: zCampoModel.idZft
                            } as IZComandoFormaState);
                        }}
                    >
                        <Glyphicon
                            style={{
                                color: "rgb(51, 122, 183)",
                                marginRight: "3px",
                            }}
                            glyph="search"
                        /> {zCampoModel.etq}
                    </span>
                }
                {(!activarBuscar) && (
                    <span>{zCampoModel.etq}</span>
                )}
            </Col>
        );
    }
}