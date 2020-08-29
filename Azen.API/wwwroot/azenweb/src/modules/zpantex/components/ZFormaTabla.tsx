import * as React from 'react';

import {
    Constants as ZCommonConstants
} from '../../zcommon/constants';

import { IZFormaTablaState, IZPantexState } from "../../zcommon";

import { ZFormaTablaZoomContainer } from '../containers/ZFormaTablaZoomContainer';
import { ZFormaTablaMovContainer } from '../containers/ZFormaTablaMovContainer';
import { ZFormaTablaForm } from './ZFormaTablaForm';
import { ZFormaTablaCmpsFijos } from './ZFormaTablaCmpsFijos';

export interface OwnProps {
    zPantex: IZPantexState;
    zFormaTabla: IZFormaTablaState;
    zftIndex: number;
}

export interface ConnectedDispatch {
    onSaltarMov: (zFormaTablaState: IZFormaTablaState, regionDestino: number) => void;
}

export interface ConnectedState {
}


export class ZFormaTabla extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);
        this.onZftClick = this.onZftClick.bind(this);
    }

    render(): any {

        return (
            <div
                onClick={this.onZftClick}
                className="azn-zft-div-container"
            >

                {/*No es multi, es formulario*/}
                {((this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREAR
                    || this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMENSAJE
                    || this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREAROCULTO)
                    || (
                        this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV
                        && this.props.zFormaTabla.venState.numLinsDatos == 0
                    )
                )
                    &&
                    <ZFormaTablaForm
                        zPantex={this.props.zPantex}
                        zFormaTabla={this.props.zFormaTabla}
                        zftIndex={this.props.zftIndex}
                    />
                }

                {/*Multi ZOOM sólo lectura*/}
                {(this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARZOOM
                    && this.props.zFormaTabla.filasCamposList) &&
                    (<ZFormaTablaZoomContainer
                        zFormaTabla={this.props.zFormaTabla}
                    />)
                }

                {/*Multi MOVIMIENTO*/}
                {(this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV
                    && this.props.zFormaTabla.filasCamposList
                    && this.props.zFormaTabla.venState.numLinsDatos > 0
                ) &&
                    (<ZFormaTablaMovContainer
                        zFormaTabla={this.props.zFormaTabla}
                        tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                    />)
                }

                {/*Campos fijos*/}
                {(this.props.zFormaTabla.camposFijosList && this.props.zFormaTabla.camposFijosList.length > 0)
                    && (
                        <ZFormaTablaCmpsFijos
                            zFormaTabla={this.props.zFormaTabla}
                            tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                        />
                    )
                }
                <div style={{ clear: 'both' }}> </div>
            </div>
        );
    }


    onZftClick(e: any) {        

        if (e.target.tagName.toLowerCase() != "div") {
            return;
        }

        if (this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV) {

            if (this.props.zFormaTabla.esRegionActiva) {
                return;
            }

            //this.props.onSaltarMov(this.props.zFormaTabla, (this.props.zftIndex + 1));
        }
    }
}