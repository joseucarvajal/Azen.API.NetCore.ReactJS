import * as React from 'react';

require('moment/locale/es');

import {
    FormGroup,
    Col,
    InputGroup,
    Glyphicon
} from 'react-bootstrap';

{/*
    Ref: https://github.com/YouCanBookMe/react-datetime
*/}
var DateTime = require('react-datetime');
var moment = require('moment');

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IParametrosActivacionObj,
    IZFormaTablaState,
} from "../../zcommon";

import { ZLabelCampoContainer } from '../containers/ZLabelCampoContainer';
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoModel: IZCampoState;
    zFormaTabla: IZFormaTablaState;
    tipoCmdPantex: ZCommonConstants.ComandoEnum;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
    parametrosActivacionObj: IParametrosActivacionObj;
}

export interface ConnectedDispatch {
    onCampoChangedEnviarCmd: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoFecha extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    formato: string = "DD/MM/YYYY";
    fechaConFormato: string = "";
    fechaMoment: any;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.limpiarCampo = this.limpiarCampo.bind(this);
        this.renderFecha = this.renderFecha.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {

        const { zCampoModel } = this.props;

        this.fechaConFormato = "";

        if (zCampoModel.value && zCampoModel.value != "00000000") {

            if (zCampoModel.value.length != 8 || (zCampoModel.value.length == 8 && zCampoModel.value.indexOf("/") != -1)) {                
                this.fechaConFormato = zCampoModel.value;
            }
            else {
                this.fechaConFormato =
                    zCampoModel.value.substring(0, 2) + "/"
                    + zCampoModel.value.substring(2, 4) + "/"
                    + zCampoModel.value.substring(4, 8);

                this.fechaMoment = moment(this.fechaConFormato, this.formato, true).format('L');
            }
        } else {

            this.fechaMoment = this.props.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV && this.props.zFormaTabla.rg == 1
                ? moment(new Date(this.props.parametrosActivacionObj.anio, this.props.parametrosActivacionObj.numeroMes, 15), this.formato)
                : moment(); //Si no es encabezado de movimiento es fecha actual.
        }

        const disabled = this.props.estaProcesandoRequestServidor || zCampoModel.noArrivable;
        return (
            <DateTime
                dateFormat={this.formato}
                timeFormat={false}
                inputProps={{ title: 'formato ' + this.formato, disabled: disabled, readOnly: zCampoModel.readOnly }}
                closeOnSelect={true}
                value={this.fechaMoment}
                onChange={this.onChange}
                renderInput={this.renderFecha}
            />
        );
    }

    renderFecha(props: any, openCalendar: any, closeCalendar: any) {

        const { zCampoModel } = this.props;

        const disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;

        return (
            <FormGroup bsSize="small">
                <Col md={12}>
                    <ZLabelCampoContainer zCampoModel={zCampoModel} />
                    <Col>
                        <InputGroup>
                            <ZCampoTextoBasicoContainer
                                zCampoState={zCampoModel}
                                zFormaTabla={this.props.zFormaTabla}
                                valor={this.fechaConFormato}
                                maxLength={10}
                            />
                            {/*
                            <InputGroup.Addon
                                onClick={this.limpiarCampo}
                                title="Borrar fecha"
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="remove-circle" />
                            </InputGroup.Addon>                            
                            */}
                            <InputGroup.Addon
                                onClick={openCalendar}
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="calendar" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    onChange(momentChanged: any) {        

        if (this.props.zCampoModel.readOnly) {
            return;
        }

        const dia = momentChanged._d.getDate() < 10
            ? "0" + momentChanged._d.getDate().toString()
            : momentChanged._d.getDate();

        const mes = (momentChanged._d.getMonth() + 1) < 10
            ? "0" + (momentChanged._d.getMonth() + 1).toString()
            : (momentChanged._d.getMonth() + 1);

        const valorFecha = dia.toString() + mes.toString() + momentChanged._d.getFullYear().toString();

        this.props.onCampoChangedEnviarCmd(this.props.zCampoModel, valorFecha);
    }

    limpiarCampo() {

        if (this.props.zCampoModel.readOnly) {
            return;
        }

        this.props.onCampoChangedEnviarCmd(this.props.zCampoModel, "");
    }
}