import * as React from 'react';

import * as ZCommon from "../../zcommon";
import {
    IZCampoState,
    IZFormaTablaState
} from "../../zcommon";

import ZCampoGrafico from './ZCampoGrafico';
import { ZCampoRadioContainer } from '../containers/ZCampoRadioContainer';
import { ZCampoCheckboxContainer } from '../containers/ZCampoCheckboxContainer';
import { ZCampoTextboxContainer } from '../containers/ZCampoTextboxContainer';
import { ZCampoDetallableContainer } from '../containers/ZCampoDetallableContainer';
import { ZCampoFechaContainer } from '../containers/ZCampoFechaContainer';
import { ZCampoArchivoContainer } from '../containers/ZCampoArchivoContainer';

interface OwnProperties {
    zFormaTabla: IZFormaTablaState;
    tipoCmdPantex: ZCommon.Constants.ComandoEnum;
    zCampo: IZCampoState;
}

export default class ZCampo extends React.PureComponent<OwnProperties, undefined>
{
    private isRegion: boolean = false;

    constructor(props: OwnProperties) {
        super(props);
    }

    render() {

        const { zCampo } = this.props;
        const claseInd: number = zCampo.claseInd;

        let zCampoComponent = this.getZCampoComponent();

        return (
            <div>
                {zCampoComponent}
            </div>
        );
    }

    getZCampoComponent(): any {
        const {
            zFormaTabla,
            zCampo,
        } = this.props;

        const { claseInd, nomCmp, cmpsState, esCampoGrafico, esDetallable } = zCampo;

        if (esCampoGrafico) {
            return <ZCampoGrafico
                zCampoGrafico={zCampo}
                zFormaTabla={zFormaTabla}
                tipoCmdPantex={this.props.tipoCmdPantex}
            />
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
            if (esDetallable) {
                return <ZCampoDetallableContainer
                            zCampoState={zCampo}
                            zFormaTabla={zFormaTabla}
                />;
            }
            else if (zCampo.tipo == ZCommon.Constants.TipoCampoEnum.TIPO_FECHA) {
                return <ZCampoFechaContainer 
                            zCampoModel={zCampo} 
                            zFormaTabla={this.props.zFormaTabla} 
                            tipoCmdPantex={this.props.tipoCmdPantex} />
            }
            else if (zCampo.esArchivo) {
                return <ZCampoArchivoContainer 
                            zCampoModel={zCampo} 
                            zFormaTabla={this.props.zFormaTabla} />
            }
            return <ZCampoTextboxContainer
                        zCampoState={zCampo}
                        zFormaTabla={zFormaTabla}
            />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_RADIO) {
            return <ZCampoRadioContainer
                        zCampoModel={zCampo}
            />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
            return <ZCampoCheckboxContainer
                        zCampoModel={zCampo}
            />;
        } else {
            return <span>{zCampo.etq}</span>;
        }
    }
}