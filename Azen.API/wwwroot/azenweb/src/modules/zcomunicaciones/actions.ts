import * as ZCommon from "../zcommon";
import * as ZUtils from "../zutils";
import { ResultadoActionConDato, ResultadoAction } from "../zutils";
import { getCipherText } from '../zcriptography/zcriptography';

import {
  IZAplState,  
  IZEnviarComandoParams,
  IZEnviarComandoParamsOptional,
  ZCommandDTO,
} from "../zcommon/contracts";
import { ActionTypes } from "./actionTypes";

export namespace Actions {
  export const enviarRequestComando = <TRetorno>(
    parametros: IZEnviarComandoParams
  ) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ): Promise<ResultadoActionConDato<TRetorno>> => {
    return new Promise<ResultadoActionConDato<TRetorno>>((resolve, reject) => {
      const idApl = getState().idApl;
      const azenURL = getState().azenURL;

      const { cmd, buffer } = parametros;

      const requestUrl =
          cmd === ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN
              ? `${ZUtils.Services.trimLasCharacter(getState().azenURL, "/")}/api/command/aceptarlogin`
              : `${ZUtils.Services.trimLasCharacter(getState().azenURL, "/")}/api/command/${idApl}/execute`;

      const port = sessionStorage.getItem(
        ZCommon.Constants.SessionStorageKeyEnum.AZEN_PUERTO
      );      
      const request = {
        port: port ? parseInt(port) : 0,
        cmd,
        buffer: getCipherText(buffer),
        log: getState().nivelLog,
        ...parametros.optionalParams
      } as ZCommandDTO;

      const optionalParams = getOptionalParams(parametros, {
        tkns: getState().zLoginModule.tkns,
      });

      if (getState().nivelLog == 1) {
        console.log(
          "----------------------------------------------------------------"
        );
        console.time(`${ZCommon.Constants.ComandoEnum[cmd]} = ${cmd}`);
        console.log({requestUrl});
        console.log({buffer});
      }

      dispatch(setProcesosServidor(true, parametros.tipoAJAXIndicador));
      fetch(requestUrl, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            cmd === ZCommon.Constants.ComandoEnum.CM_APLICACION || ZCommon.Constants.ComandoEnum.CM_EJECSOLOOPCION
              ? getState().zLoginModule.tkna
              : getState().zLoginModule.tkns
          }`,
        },
        //credentials: "include",
        method: "POST",
        body: JSON.stringify(request),
        synchronous: true,
      } as any)
        .then((response) => {
          dispatch(setProcesosServidor(false, parametros.tipoAJAXIndicador));
          return response.text();
        })
        .then((retornoStr: string) => {
          if (getState().nivelLog == 1) {
            console.timeEnd(`${ZCommon.Constants.ComandoEnum[cmd]} = ${cmd}`);
            console.log(retornoStr);
          }
          if (retornoStr[retornoStr.length - 1] != "}") {
            retornoStr = retornoStr.substring(0, retornoStr.length - 1);
          }
          retornoStr = retornoStr.replace("<usr>null</usr>", "");
          retornoStr = retornoStr.replace(
            'La edicion de "Cuentas" presenta modificaciones.',
            "La edicion de Cuentas presenta modificaciones."
          );
          retornoStr = retornoStr.replace(
            'La edicion de "Tercero" presenta modificaciones.',
            "La edicion de Tercero presenta modificaciones."
          );

          let retorno: TRetorno = JSON.parse(retornoStr);
          let resultadoActionExito = new ResultadoActionConDato<TRetorno>();
          resultadoActionExito.retorno = retorno;
          resultadoActionExito.resultado =
            ZUtils.Constants.ResultadoAccionEnum.EXITO;
          resolve(resultadoActionExito);
        })
        .catch((error) => {
          let resultadoActionError = new ResultadoAction();
          resultadoActionError.resultado =
            ZUtils.Constants.ResultadoAccionEnum.ERROR;
          resultadoActionError.mensaje = `Error ejecutando comando ${ZCommon.Constants.ComandoEnum[cmd]} = ${cmd}`;
          resultadoActionError.traza = error;
          console.error("Comunicaciones/services/enviarRequestComando");
          console.error(resultadoActionError);
          dispatch(setProcesosServidor(false, parametros.tipoAJAXIndicador));
          reject(resultadoActionError);
        });
    });
  };

  export const cargarCfg = (): Promise<any> => {
      return new Promise<any>((resolve, reject) => {
        /*
      fetch("../cfg.json", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "GET",
      } as any)
        .then((response) => {
          return response.json();
        })
        .then((cfgObj: any) => {
          resolve(cfgObj);
        })
        .catch((error) => {
          reject(error);
        });
        */
          resolve({
              azenBackEndURL: "https://localhost:44391/",
              urlCargarArchivo: "http://52.42.49.101:8080/azenupl/index.jsp"
          });
    });
  };

  export const setProcesosServidor = (
    estaProcesandoRequestServidor: boolean,
    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum
  ) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
    dispatch(setEstaProcesandoRequestServidor(estaProcesandoRequestServidor));
    dispatch(setTipoAJAXIndicador(tipoAJAXIndicador));
  };

  export const setEstaProcesandoRequestServidor = (
    valor: boolean
  ): ActionTypes.Action => ({
    type: ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR,
    valor,
  });

  export const setTipoAJAXIndicador = (
    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum = ZCommon
      .Constants.TipoAJAXIndicadorEnum.NIGUNO
  ): ActionTypes.Action => ({
    type: ActionTypes.SET_TIPOAJAXINDICADOR,
    tipoAJAXIndicador,
  });

  const getOptionalParams = (
    parametros: IZEnviarComandoParams,
    optionalExternalParams: IZEnviarComandoParamsOptional
  ): string => {
    let aditionalParams = `&`;

    for (const property in parametros.optionalParams) {
      if (parametros.optionalParams[property]) {
        aditionalParams += `${property}=${parametros.optionalParams[property]}&`;
      }
    }

    for (const property in optionalExternalParams) {
      if (optionalExternalParams[property]) {
        aditionalParams += `${property}=${optionalExternalParams[property]}&`;
      }
    }

    return aditionalParams.slice(0, -1);
  };
}
