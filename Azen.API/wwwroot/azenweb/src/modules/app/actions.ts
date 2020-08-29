import {
    Constants as ZCommonConstants
} from "../zcommon/Constants";

import { ActionTypes } from "./actionTypes";
import { IParametrosActivacionObj } from "../zcommon";

export namespace Actions {

    export const setIdApl = (idApl: string = null): ActionTypes.Action => ({
        type: ActionTypes.SET_IDAPL,
        idApl
    });

    export const setNomApl = (nomApl: string = null): ActionTypes.Action => ({
        type: ActionTypes.SET_NOMAPL,
        nomApl
    });
    
    export const setAzenUrl = (azenURL: string = null): ActionTypes.Action => ({
        type: ActionTypes.SET_AZENURL,
        azenURL
    });

    export const setLanzarMenu = (lanzarMenu: number): ActionTypes.Action => ({
        type: ActionTypes.SET_LANZARMENU,
        lanzarMenu
    });
    
    export const setParametrosActivacionObj = (parametrosActivacionObj: IParametrosActivacionObj): ActionTypes.Action => ({
        type: ActionTypes.SET_PARAMETROSACTIVACIONOBJ,
        parametrosActivacionObj
    });

    export const setNivelLog = (nivelLog: number = 0): ActionTypes.Action => ({
        type: ActionTypes.SET_NIVELLOG,
        nivelLog
    });
    
    export const setUltimoComandoEnviado = (cmd: ZCommonConstants.ComandoEnum): ActionTypes.Action => ({
        type: ActionTypes.SET_ULTIMOCOMANDOENVIADO,
        cmd
    });

}