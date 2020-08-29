import * as React from 'react';

import {
    FormGroup,
    Col,
} from 'react-bootstrap';

import {
    IZCampoState,
    IZFormaTablaState
} from "../../zcommon";

import { ZLabelCampoContainer } from '../containers/ZLabelCampoContainer';
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoState: IZCampoState;
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {

}

export interface ConnectedDispatch {

}

export class ZCampoTextbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {
        const { zCampoState, zFormaTabla } = this.props;
        if (zCampoState.esFijo || zFormaTabla.venState.numLinsDatos == 0) { //Es fijo o NO es de un multi
            return (
                <FormGroup
                    bsSize="small"
                >

                    <Col md={12}>
                        {(zCampoState.etq != "sinetiqueta") && 
                            <ZLabelCampoContainer zCampoModel={zCampoState} />
                        }
                        <Col>
                            <ZCampoTextoBasicoContainer
                                zCampoState={zCampoState}
                                zFormaTabla={zFormaTabla}
                            />
                        </Col>
                    </Col>
                </FormGroup>
            );
        } else {
            if (zFormaTabla.venState.numLinsDatos > 0) { //Es multi
                return (
                    <FormGroup
                        bsSize="small"
                        style={{
                            border: zCampoState.fi == zFormaTabla.indexFilaMultiSeleccionada ? "1px solid" : "none"
                        }}
                    >
                        <ZCampoTextoBasicoContainer
                            zCampoState={zCampoState}
                            zFormaTabla={zFormaTabla}
                        />
                    </FormGroup>
                );
            }
        }
    }
}