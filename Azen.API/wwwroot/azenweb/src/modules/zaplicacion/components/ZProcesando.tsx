import * as React from 'react';

var Modal = require('react-bootstrap-modal');

import * as ZCommon from '../../zcommon';

export interface OwnProps {

}

export interface ConnectedState {
    show: boolean;
    tipoAJAXIndicador: number;
}

export interface ConnectedDispatch {

}

export class ZProcesando extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {

        if (this.props.show && this.props.tipoAJAXIndicador == ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL) {
            return (
                <div className="static-modal">
                    <Modal
                        show={true}
                        backdrop="static"
                        onHide={null}                        
                        aria-labelledby="contained-modal-title-sm"
                        style={{
                            top: "50px"
                        }}
                    >
                        <Modal.Body>
                            <div className="zaplicacion-zprocesando-loader">
                                <div className="sk-folding-cube">
                                    <div className="sk-cube1 sk-cube"></div>
                                    <div className="sk-cube2 sk-cube"></div>
                                    <div className="sk-cube4 sk-cube"></div>
                                    <div className="sk-cube3 sk-cube"></div>
                                </div>
                                <h4>&nbsp;&nbsp;&nbsp;Procesando</h4>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
        else {
            return (<span></span>);
        }

    }
}