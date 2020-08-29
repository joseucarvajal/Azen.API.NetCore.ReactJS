
import {
    Constants as ZCommonConstants
} from "../zcommon/Constants";
import { IParametrosActivacionObj } from "../zcommon";

export namespace ActionTypes {

    export namespace Types {
        export type SET_IDAPL = "App/SET_IDAPL";
        export type SET_NOMAPL = "App/SET_NOMAPL";
        export type SET_AZENURL = "App/SET_AZENURL";
        export type SET_LANZARMENU = "App/SET_LANZARMENU";
        export type SET_PARAMETROSACTIVACIONOBJ = "App/SET_PARAMETROSACTIVACIONOBJ";
        export type SET_NIVELLOG = "App/SET_NIVELLOG";
        export type SET_ULTIMOCOMANDOENVIADO = "App/SET_ULTIMOCOMANDOENVIADO";
    }

    export const SET_IDAPL: Types.SET_IDAPL = "App/SET_IDAPL";
    export const SET_NOMAPL: Types.SET_NOMAPL = "App/SET_NOMAPL";
    export const SET_AZENURL: Types.SET_AZENURL = "App/SET_AZENURL";
    export const SET_LANZARMENU: Types.SET_LANZARMENU = "App/SET_LANZARMENU";
    export const SET_PARAMETROSACTIVACIONOBJ: Types.SET_PARAMETROSACTIVACIONOBJ = "App/SET_PARAMETROSACTIVACIONOBJ";
    export const SET_NIVELLOG: Types.SET_NIVELLOG = "App/SET_NIVELLOG";
    export const SET_ULTIMOCOMANDOENVIADO: Types.SET_ULTIMOCOMANDOENVIADO = "App/SET_ULTIMOCOMANDOENVIADO";
    
    export type Action =
        { type: Types.SET_IDAPL, idApl: string } |
        { type: Types.SET_NOMAPL, nomApl: string } |
        { type: Types.SET_AZENURL, azenURL: string } |
        { type: Types.SET_LANZARMENU, lanzarMenu: number } |
        { type: Types.SET_PARAMETROSACTIVACIONOBJ, parametrosActivacionObj: IParametrosActivacionObj } |
        { type: Types.SET_NIVELLOG, nivelLog: number } |
        { type: Types.SET_ULTIMOCOMANDOENVIADO, cmd: ZCommonConstants.ComandoEnum } 
}