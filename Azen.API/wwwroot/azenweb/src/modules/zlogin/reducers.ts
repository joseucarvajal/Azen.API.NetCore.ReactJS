const u = require('updeep');

import {
    IZLoginModule,
    IZAplList
} from "../zcommon/contracts";

import {
    ResultadoAction
} from "../zutils/models";

import {
    ActionTypes
} from './actionTypes';

export namespace Reducers {

    export namespace ZLoginModule {

        const zLoginModule = {
            username: '',
            password: '',
            // zAplList: { apls: [] } as IZAplList,
            zAplList:
                {
                    datosIniciales: {}, 
                    gruposAplicaciones: [], 
                    opcionesPreferidas: [], 
                    opcionesFrecuentes: [],
                    soporte: []
            
            } as IZAplList,
            resultadoAction: new ResultadoAction(),
            tkna: '',
            tkns: ''
        } as IZLoginModule;

        export const impl = (state: IZLoginModule = zLoginModule, action: ActionTypes.ZLoginModule.Action) => {

            switch (action.type) {

                case ActionTypes.ZLoginModule.SET_USERNAME:
                    return u({
                        username: action.username
                    } as IZLoginModule, state);

                case ActionTypes.ZLoginModule.SET_PASSWORD:
                    return u({
                        password: action.password
                    } as IZLoginModule, state);

                case ActionTypes.ZLoginModule.SET_ZAPLLIST:
                    return u({
                        zAplList: action.zAplList
                    } as IZLoginModule, state);

                case ActionTypes.ZLoginModule.SET_RESULTADOACTION:
                    return u({
                        resultadoAction: action.resultadoAction
                    } as IZLoginModule, state);

                case ActionTypes.ZLoginModule.SET_TKNA:
                    return u({
                        tkna: action.tkna
                    } as IZLoginModule, state);

                case ActionTypes.ZLoginModule.SET_TKNS:
                    return u({
                        tkns: action.tkns
                    } as IZLoginModule, state);
            }

            return state;
        }
    }

}