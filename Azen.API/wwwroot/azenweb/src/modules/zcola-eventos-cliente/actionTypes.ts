import {
    ZColaEventosClienteState,
    ZEventoEncolado,
} from "../zcommon";

export namespace ActionTypes {

    export namespace ZColaEventosClienteModule {

        export namespace Types {
            export type ENCOLAR_EVENTO_CLIENTE = "ZColaEventosModule/ENCOLAR_EVENTO_CLIENTE";
            export type DESENCOLAR_EVENTO_CLIENTE = "ZColaEventosModule/DESENCOLAR_EVENTO_CLIENTE";
            export type LIMPIAR_COLA_EVENTOS_CLIENTE = "ZColaEventosModule/LIMPIAR_COLA_EVENTOS_CLIENTE";
           
        }

        export const ENCOLAR_EVENTO_CLIENTE: Types.ENCOLAR_EVENTO_CLIENTE = "ZColaEventosModule/ENCOLAR_EVENTO_CLIENTE";
        export const DESENCOLAR_EVENTO_CLIENTE: Types.DESENCOLAR_EVENTO_CLIENTE = "ZColaEventosModule/DESENCOLAR_EVENTO_CLIENTE";
        export const LIMPIAR_COLA_EVENTOS_CLIENTE: Types.LIMPIAR_COLA_EVENTOS_CLIENTE = "ZColaEventosModule/LIMPIAR_COLA_EVENTOS_CLIENTE";
    
        export type Action =
            { type: Types.ENCOLAR_EVENTO_CLIENTE, infoEvento: ZEventoEncolado } |
            { type: Types.DESENCOLAR_EVENTO_CLIENTE, idElemento: number } |
            { type: Types.LIMPIAR_COLA_EVENTOS_CLIENTE }
    }
}