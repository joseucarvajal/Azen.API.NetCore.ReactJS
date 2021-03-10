const u = require('updeep');

import { Reducer, combineReducers } from 'redux';
import { IZAplState, IParametrosActivacionObj } from "../zcommon/contracts";

import * as ZComunicaciones from '../zcomunicaciones';
import * as ZLogin from '../zlogin';
import * as ZMenu from '../zmenu';
import * as ZPantex from '../zpantex';

import { ActionTypes } from "./actionTypes";

import * as ZCommon from "../zcommon";

import {Reducers as ZColaEventosClienteModuleReducers} from '../zcola-eventos-cliente/reducers';

export namespace Reducers {

    export const idApl = (state: string = null, action: ActionTypes.Action): string => {

        switch (action.type) {
            case ActionTypes.SET_IDAPL:
                return action.idApl;
        }

        return state;
    }

    export const nomApl = (state: string = null, action: ActionTypes.Action): string => {

        switch (action.type) {
            case ActionTypes.SET_NOMAPL:
                return action.nomApl;
        }

        return state;
    }

    export const azenURL = (state: string = null, action: ActionTypes.Action): string => {

        switch (action.type) {
            case ActionTypes.SET_AZENURL:
                return action.azenURL;
        }

        return state;
    }

    export const lanzarMenu = (state: number = null, action: ActionTypes.Action): number => {

        switch (action.type) {
            case ActionTypes.SET_LANZARMENU:
                return action.lanzarMenu;
        }

        return state;
    }
    
    export const parametrosActivacionObj = (state: IParametrosActivacionObj = {} as IParametrosActivacionObj, action: ActionTypes.Action): IParametrosActivacionObj => {

        switch (action.type) {
            case ActionTypes.SET_PARAMETROSACTIVACIONOBJ:
                return u({
                    anio: action.parametrosActivacionObj.anio,
                    bd: action.parametrosActivacionObj.bd,
                    mes: action.parametrosActivacionObj.mes,
                    numeroMes: action.parametrosActivacionObj.numeroMes,
                    uid: action.parametrosActivacionObj.uid,
                    usuario: action.parametrosActivacionObj.usuario
                } as IParametrosActivacionObj, state);
        }

        return state;
    }

    export const nivelLog = (state: number = null, action: ActionTypes.Action): number => {

        switch (action.type) {
            case ActionTypes.SET_NIVELLOG:
                return action.nivelLog;
        }

        return state;
    }

    export const ultimoComandoEnviado = (state: ZCommon.Constants.ComandoEnum = null, action: ActionTypes.Action): ZCommon.Constants.ComandoEnum => {

        switch (action.type) {
            case ActionTypes.SET_ULTIMOCOMANDOENVIADO:
                return action.cmd
        }

        return state;
    }

    export const tipoAJAXIndicador = (state: ZCommon.Constants.TipoAJAXIndicadorEnum = ZCommon.Constants.TipoAJAXIndicadorEnum.NIGUNO, action: ZComunicaciones.ActionTypes.Action): ZCommon.Constants.TipoAJAXIndicadorEnum => {

        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_TIPOAJAXINDICADOR:
                return action.tipoAJAXIndicador
        }

        return state;
    }

    export const estaProcesandoRequestServidor = (state: boolean = false, action: ZComunicaciones.ActionTypes.Action): boolean => {

        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR:
                return action.valor;
        }

        return state;
    }

    export const zaplState: Reducer<IZAplState> = combineReducers<IZAplState>({

        idApl: idApl,
        nomApl: nomApl,
        lanzarMenu: lanzarMenu,
        azenURL: azenURL,

        parametrosActivacionObj: parametrosActivacionObj,

        nivelLog: nivelLog,

        tipoAJAXIndicador: tipoAJAXIndicador,
        ultimoComandoEnviado: ultimoComandoEnviado,
        estaProcesandoRequestServidor: estaProcesandoRequestServidor,
        zMenuModule: ZMenu.Reducers.ZMenuModule.impl,
        zPantexStateModule: ZPantex.Reducers.ZPantexStateModule.impl,
        zLoginModule: ZLogin.Reducers.ZLoginModule.impl,
        zColaEventosState: ZColaEventosClienteModuleReducers.ZColaEventosClienteModule.impl,
    });
}