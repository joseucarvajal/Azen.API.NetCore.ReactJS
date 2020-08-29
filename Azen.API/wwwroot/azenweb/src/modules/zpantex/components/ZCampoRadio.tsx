import * as React from 'react';

import {
    Radio
} from 'react-bootstrap';

import {    
    IZCampoState,
    Constants as ZCommonConstants,
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor:boolean;
}

export interface ConnectedDispatch {
    prenderValorBitRadio: (zcampoState: IZCampoState) => void;
}

export class ZCampoRadio extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    render() {

        const { zCampoModel } = this.props;

        return (
            <Radio
                inline
                checked={zCampoModel.checked}
                value={zCampoModel.lon}
                onClick={this.onClick}
                disabled={
                    this.props.estaProcesandoRequestServidor
                    || zCampoModel.readOnly
                }    
            >
                {zCampoModel.etq.replace("( )", "")}
            </Radio>
        );
    }

    
    onClick(e: any) {
        this.props.prenderValorBitRadio(this.props.zCampoModel);
    }
}