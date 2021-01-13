import * as React from 'react';

import {
    FormControl,
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState,
} from "../../zcommon";

export interface OwnProps {
    zCampoState: IZCampoState;
    zFormaTabla: IZFormaTablaState;
    valor?: any; //Sobreescribe el valor de zCampoModel.value: caso fechas para pintar con formato
    readOnly?: boolean; //Sobreescribe el valor de zCampoModel.readOnly: caso fechas
    maxLength?: number; //Sobreescribe el valor de zCampoModel.lon: caso fechas
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    onCampoFocusIrACmp: (zcampoState: IZCampoState) => void;
    onCampoBlur: (zcampoState: IZCampoState) => void;
    onCampoChanged: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoTextoBasico extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private ref: any;    

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.darFormatoValorCampoSegunTipo = this.darFormatoValorCampoSegunTipo.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {

        let { zCampoState, zFormaTabla, valor } = this.props;
        valor = valor ? valor : zCampoState.value;

        return (
            <FormControl
                type="text"
                inputRef={(ref: any) => {
                    this.ref = ref;
                }}
                name={zCampoState.nomCmp}
                value={valor}
                title={valor}
                onFocus={this.onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur}
                autoFocus={zCampoState.autoFocus}
                maxLength={this.props.maxLength ? this.props.maxLength : zCampoState.lon}
                readOnly={zCampoState.readOnly || this.props.estaProcesandoRequestServidor}
                disabled={zCampoState.noArrivable || (zCampoState.fi != undefined && zFormaTabla.indexFilaMultiSeleccionada != zCampoState.fi)}
                style={{
                    borderColor: zCampoState.haCambiado || zCampoState.autoFocus ? '#337AB7' : '',
                    textAlign: zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DINERO ? 'right' : 'left',
                }}
            />
        );
    }

    onFocus(e: any) {
        
        if (this.props.zCampoState.autoFocus) {         
            return;
        }

        this.props.onCampoFocusIrACmp(this.props.zCampoState);        
    }

    onChange(e: any) {
        this.darFormatoValorCampoSegunTipo(e);
        this.props.onCampoChanged(this.props.zCampoState, e.target.value);
    }

    darFormatoValorCampoSegunTipo(e: any) {        

        let valor = e.target.value;

        if (valor.length == 0 || valor == "*") {
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_REAL
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DOBLE) {
            if (isNaN(valor)) {
                e.target.value = "";
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_ENTERO
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_LARGO) {
            if (isNaN(parseInt(valor))) {
                e.target.value = "";
            } else {
                e.target.value = parseInt(valor);
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DINERO) {            

            if (valor.length == 0) {
                return;
            }

            if (!isNaN(valor)) { //Es un número válido
                if(valor === ".00" || valor === "0.0"){
                    e.target.value = "";
                }
                else{
                    e.target.value = this.convertirAMoneda(valor, 0);
                }                
            } else {

                let cuantosDecimales = 0;

                if (valor.indexOf(".") != -1) {
                    let lastIndexOfPunto = valor.lastIndexOf(".");
                    if (lastIndexOfPunto == (valor.length - 1)) {
                        return;
                    }

                    cuantosDecimales = valor.length - lastIndexOfPunto - 1;
                    if (cuantosDecimales > 2) {
                        e.target.value = e.target.value.substr(0, lastIndexOfPunto + 3);
                        return;
                    }
                }

                e.target.value = this.convertirAMoneda(valor.replace(/,/g, ""), cuantosDecimales);
            }
        }
    }

    convertirAMoneda(n: any, c: any) {
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        let d = ".";
        let t = ",";
        let s = n < 0 ? "-" : "";
        let i: any = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
        let j;
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    darFormatoValorCampoSegunTipoOld(e: any) {

        let valor = e.target.value;

        if (valor.length == 0) {
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_REAL
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DOBLE) {
            if (isNaN(valor)) {
                e.target.value = "";
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_ENTERO
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_LARGO) {
            if (isNaN(parseInt(valor))) {
                e.target.value = "";
            } else {
                e.target.value = parseInt(valor);
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DINERO) {
            if (!isNaN(e.target.value)) {
                e.target.value = new Intl.NumberFormat().format(parseFloat(valor));
            } else {
                if (valor.indexOf(".") != -1) {
                    if (valor.lastIndexOf(".") == (valor.length - 1)) {
                        return;
                    }
                }
                valor = valor.replace(/,/g, "");

                e.target.value = new Intl.NumberFormat().format(parseFloat(valor));
            }
        }
    }

    onBlur(e: any) {       
        this.props.onCampoBlur(this.props.zCampoState);
    }

    componentDidUpdate() {
        if (this.props.zFormaTabla.esRegionActiva && this.props.zCampoState.autoFocus) {            
            //this.ref.focus();            
        }
    }
}
