import { IZAplList, IZAplState, IZEnviarComandoParams, IZColaEventos } from "../zcommon/contracts";

import { Actions as AppActions } from '../app/actions';
import {
    ActionTypes,
} from './actionTypes';

import * as ZCommon from '../zcommon';
import * as ZAplicacion from '../zaplicacion';

import { Selectors } from './selectors';

export namespace Actions {

    export namespace ZLoginModule {

        export const login = (idApl?:string, nombreOpcion?:string) =>
            (dispatch: (p: any) => any, getState: () => IZAplState) => {

                let zLoginModule = Selectors.getZLoginModule(getState());
                
                window.sessionStorage.setItem(ZCommon.Constants.AZEN_USER_SESSION_KEY, `${zLoginModule.username}`);
    
                if(nombreOpcion){
                    dispatch(AppActions.setIdApl(idApl));                
                    dispatch(ZAplicacion.Actions.despacharEventoCliente(
                        ZCommon.Constants.ComandoEnum.CM_EJECSOLOOPCION, 
                        `<usr>${zLoginModule.username}</usr><crd>${zLoginModule.password}</crd><opc>${nombreOpcion}</opc>`
                    ));
                }
                else {
                    dispatch(ZAplicacion.Actions.despacharEventoCliente(
                        ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN, 
                        `<cm>LOGIN</cm><usr>${zLoginModule.username}</usr><vc>${zLoginModule.password}</vc>`
                    ));
                }
            }    

        export const setUsername = (username: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_USERNAME,
            username
        });

        export const setPassword = (password: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_PASSWORD,
            password
        });

        export const setZAplList = (zAplList: IZAplList): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_ZAPLLIST,
            zAplList
        });

        export const setTkna = (tkna: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_TKNA,
            tkna
        });

        export const setTkns = (tkns: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_TKNS,
            tkns
        });

    }
}