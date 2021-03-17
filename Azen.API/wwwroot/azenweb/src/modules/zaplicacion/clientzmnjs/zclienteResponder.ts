import * as ZUtils from "../../zutils";
import * as ZCommon from "../../zcommon";
import { Actions as AppActions } from "../../app/actions";
import { ResultadoActionConDato } from "../../zutils";
import { Actions as ZPantexActions } from "../../zpantex/actions";

import { Selectors as ZPantexSelectors } from "../../zpantex/selectors";

import {
  IZAplState,
  IZColaEventos,
  IZEnviarComandoParamsOptional,
  ZEventoEncolado,
} from "../../zcommon";

import * as ZComunicaciones from "../../zcomunicaciones";

import { Services } from "../../zaplicacion";
import * as zCommon from "../../zcommon";

export namespace ZclienteResponder {
  export const responderEventoCliente = (
    zComando: ZCommon.Constants.ComandoEnum,
    buffer: string = "",
    optionalParams?: IZEnviarComandoParamsOptional
  ) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ): Promise<ResultadoActionConDato<IZColaEventos>> => {
      let tipoAJAXIndicador: zCommon.Constants.TipoAJAXIndicadorEnum;

      switch (zComando) {
        case ZCommon.Constants.ComandoEnum.CM_ACEPTAR:
          if (
            ZPantexSelectors.ZPantexStateModule.getZParametrosComando(getState())
              .byId[ZCommon.Constants.ComandoEnum.CM_ACEPTAR]
          ) {
            buffer = ZPantexSelectors.ZPantexStateModule.getZParametrosComando(
              getState()
            ).byId[ZCommon.Constants.ComandoEnum.CM_ACEPTAR].buffer;
          }
          tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
          break;

        case ZCommon.Constants.ComandoEnum.CM_SI:
        case ZCommon.Constants.ComandoEnum.CM_NO:
          tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
          break;

        default:
          tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.NO_MODAL;
          break;
      }

      return new Promise<ResultadoActionConDato<IZColaEventos>>(
        (resolve, reject) => {
          dispatch(
            ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
              cmd:zComando,
              buffer: buffer,
              tipoAJAXIndicador,
              optionalParams,
            })
          ).then(
            (resultadoClienteCm: ResultadoActionConDato<IZColaEventos>) => {
              if (
                resultadoClienteCm.resultado ==
                ZUtils.Constants.ResultadoAccionEnum.ERROR
              ) {
                return;
              }
              dispatch(AppActions.setUltimoComandoEnviado(zComando));
              dispatch(
                ZPantexActions.ZPantexStateModule.setComandoBuffer(zComando, "")
              );
              Services.Responder.procesarZColaEventos(
                resultadoClienteCm.retorno,
                dispatch,
                getState
              );
              resolve(resultadoClienteCm);
            },
            () => { }
          );
        }
      );
    };
}
