import * as React from 'react';
import * as ZCommon from '../../zcommon';

export interface OwnProps {

}

export interface ConnectedState {
    show: boolean;
    tipoAJAXIndicador: number;
}

export interface ConnectedDispatch {

}

export class ZProcesandoNoModal extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {
        return (
            <div>
                {(this.props.show && this.props.tipoAJAXIndicador == ZCommon.Constants.TipoAJAXIndicadorEnum.NO_MODAL) && (
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                )}
            </div>
        );
    }
}