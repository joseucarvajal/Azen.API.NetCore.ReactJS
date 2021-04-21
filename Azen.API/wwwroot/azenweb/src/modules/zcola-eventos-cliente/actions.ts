import { ZEventoEncolado } from '../zcommon';
import { ActionTypes } from './actionTypes';

export namespace Actions {

    export namespace ZColaEventosClienteModule {

        export const encolarEventoCliente = (infoEvento: ZEventoEncolado): ActionTypes.ZColaEventosClienteModule.Action => ({
            type: ActionTypes.ZColaEventosClienteModule.ENCOLAR_EVENTO_CLIENTE,
            infoEvento
        });

        export const desEncolarEventoCliente = (idElemento: number): ActionTypes.ZColaEventosClienteModule.Action => ({
            type: ActionTypes.ZColaEventosClienteModule.DESENCOLAR_EVENTO_CLIENTE,
            idElemento
        });

        export const limpiarColaEventosCliente = (): ActionTypes.ZColaEventosClienteModule.Action => ({
            type: ActionTypes.ZColaEventosClienteModule.LIMPIAR_COLA_EVENTOS_CLIENTE,
        });

    }
}