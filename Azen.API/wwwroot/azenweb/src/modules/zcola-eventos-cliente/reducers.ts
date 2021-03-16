const u = require('updeep');

import {
    ZColaEventosClienteState, ZEventoEncolado,
    Constants
} from '../zcommon';

import {
    ActionTypes
} from './actionTypes';

import {ActionTypes as ActionTypesZPantexModule} from '../zpantex/actionTypes';

export namespace Reducers {

    export namespace ZColaEventosClienteModule {

        const zColaEventosClienteState = {
           
        } as ZColaEventosClienteState;

        export const impl = (
            state: ZColaEventosClienteState = zColaEventosClienteState, 
            action: ActionTypes.ZColaEventosClienteModule.Action | ActionTypesZPantexModule.ZPantexStateModule.Action,
            ) => {

            switch (action.type) {
                case ActionTypes.ZColaEventosClienteModule.ENCOLAR_EVENTO_CLIENTE:
                    return u({
                       eventosCamposEncolados: { 
                           ...state.eventosCamposEncolados, 
                           [action.infoEvento.idElemento]:action.infoEvento,
                        }
                    } as ZColaEventosClienteState, state);

                case ActionTypes.ZColaEventosClienteModule.LIMPIAR_COLA_EVENTOS_CLIENTE:
                    return u({
                       eventosCamposEncolados: {},
                    } as ZColaEventosClienteState, state);    
                    
                case ActionTypesZPantexModule.ZPantexStateModule.ON_CAMPOCHANGE:
                    return u({
                        eventosCamposEncolados: { 
                            ...state.eventosCamposEncolados, 
                            [action.zcampoState.id]:{
                                cmd: Constants.ComandoEnum.CM_CAMBIOCMP,
                                buffer: `<nc>${action.zcampoState.nomCmp}</nc><vc>${action.valor}</vc>`,
                            } as ZEventoEncolado,
                         }
                     } as ZColaEventosClienteState, state);
                        
            }

            return state;
        }
    }
}