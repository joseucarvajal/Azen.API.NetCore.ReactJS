import * as React from 'react';

import {
    FormGroup,
    Col,
    InputGroup,
    Glyphicon
} from 'react-bootstrap';

import {
    IZCampoState,
    IZFormaTablaState,
    ZCampoState
} from "../../zcommon";

import { ZLabelCampoContainer } from '../containers/ZLabelCampoContainer';
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoState: IZCampoState;
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean
}

export interface ConnectedDispatch {
    cmDetallar: (zcampoState: IZCampoState) => void;
}

export class ZCampoDetallable extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const { zCampoState, zFormaTabla } = this.props;
        const disabled = this.props.estaProcesandoRequestServidor || zCampoState.readOnly;

        if (zFormaTabla.venState.numLinsDatos == 0) {
            return (
                <FormGroup bsSize="small">
                    <Col md={12}>
                        <ZLabelCampoContainer zCampoModel={zCampoState} />
                        <Col>
                            <InputGroup>
                                <ZCampoTextoBasicoContainer
                                    zCampoState={zCampoState}
                                    zFormaTabla={zFormaTabla}
                                />
                                <InputGroup.Addon
                                    onClick={this.onCampoZoomClick}
                                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                    <Glyphicon glyph="list" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </Col>
                    </Col>
                </FormGroup>
            );
        }
        else {
            if (zFormaTabla.venState.numLinsDatos > 0) { //Es multi
                return (
                    <FormGroup bsSize="small"
                        style={{
                            marginBottom: "1px",
                            border: zCampoState.fi == zFormaTabla.indexFilaMultiSeleccionada ? "1px solid" : "none"                            
                        }}
                    >
                        <InputGroup>
                            <ZCampoTextoBasicoContainer
                                zCampoState={zCampoState}
                                zFormaTabla={zFormaTabla}
                            />
                            <InputGroup.Addon
                                onClick={this.onCampoZoomClick}
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="list" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                );
            }
        }
    }

    onCampoZoomClick(e:any) {
        this.props.cmDetallar(this.props.zCampoState);
        e.stopPropagation();
    }
}
