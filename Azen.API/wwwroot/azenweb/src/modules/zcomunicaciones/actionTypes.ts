import { Constants as CommonConstants } from "../zcommon/constants";

export namespace ActionTypes {

    export namespace Types {
        export type SET_ESTAPROCESANDOREQUESTSERVIDOR = "zcomunicaciones/SET_ESTAPROCESANDOREQUESTSERVIDOR";
        export type SET_TIPOAJAXINDICADOR = "zcomunicaciones/SET_TIPOAJAXINDICADOR";
    }

    export const SET_ESTAPROCESANDOREQUESTSERVIDOR: Types.SET_ESTAPROCESANDOREQUESTSERVIDOR = "zcomunicaciones/SET_ESTAPROCESANDOREQUESTSERVIDOR";
    export const SET_TIPOAJAXINDICADOR: Types.SET_TIPOAJAXINDICADOR = "zcomunicaciones/SET_TIPOAJAXINDICADOR";

    export type Action =
        { type: Types.SET_ESTAPROCESANDOREQUESTSERVIDOR, valor: boolean } |
        { type: Types.SET_TIPOAJAXINDICADOR, tipoAJAXIndicador: CommonConstants.TipoAJAXIndicadorEnum }
}