import * as React from 'react';

import {
    Checkbox,
    FormGroup
} from 'react-bootstrap';

import {    
    IZCampoState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor:boolean;
}

export interface ConnectedDispatch {
    notificarCambioCheckbox: (zcampoState: IZCampoState) => void;
}

export class ZCampoCheckbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(): any {

        const { zCampoModel } = this.props;

        return (
            <FormGroup>
                <Checkbox                    
                    checked={zCampoModel.checked}
                    onChange={this.onClick}
                    disabled={
                        this.props.estaProcesandoRequestServidor
                        || zCampoModel.readOnly
                    }                        
                >
                    {zCampoModel.etq.replace("[ ]", "")}
                </Checkbox>
            </FormGroup>
        );
    }

    onClick(e: any) {
        this.props.notificarCambioCheckbox(this.props.zCampoModel);
    }
}