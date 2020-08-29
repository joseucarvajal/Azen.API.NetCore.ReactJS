import * as ZUtils from "../zutils";
import { ResultadoActionConDato } from "../zutils/models";

import * as ZCommon from "../zcommon";
import {
  IZAplState,
  IZColaEventos,
  IZComandoFormaState,
  IZFormaTablaState,
  IZPantexState,
  IZEnviarComandoParamsOptional,
} from "../zcommon/contracts";

import * as App from "../app";
import * as ZMenu from "../zmenu";
import * as ZComunicaciones from "../zcomunicaciones";
import * as ZLogin from "../zlogin";

import { ZclienteResponder } from "./clientzmnjs/zclienteResponder";

import { Actions as ZPantexActions } from "../zpantex/actions";
import { Services } from "./services";

export namespace Actions {
  export const lanzarAplicacion = (
    idApl: string,
    nomApl: string,
    username: string = "",
    lanzarMenu: string,
    opcion: string,
    tkna: string
  ): any => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ): Promise<ResultadoActionConDato<IZColaEventos>> => {

    dispatch(App.Actions.setIdApl(idApl));
    dispatch(App.Actions.setNomApl(nomApl));
    dispatch(ZLogin.Actions.ZLoginModule.setUsername(username));
    dispatch(ZLogin.Actions.ZLoginModule.setTkna(tkna));

    if(opcion){
        return dispatch(lanzarOpcionAtomica(opcion, tkna));
    }

    return new Promise<ResultadoActionConDato<IZColaEventos>>(
      (resolve, reject) => {
        dispatch(
          ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
            cmd: ZCommon.Constants.ComandoEnum.CM_APLICACION,
            buffer: getState().zLoginModule.username,
            tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL
          })
        ).then(
          (resultadoCmAplicacion: ResultadoActionConDato<IZColaEventos>) => {
            if (
              resultadoCmAplicacion.resultado ==
              ZUtils.Constants.ResultadoAccionEnum.ERROR
            ) {
              reject(resultadoCmAplicacion);
              return;
            }

            Services.Responder.procesarZColaEventos(
              resultadoCmAplicacion.retorno,
              dispatch,
              getState
            );

            if (lanzarMenu == "1") {
              dispatch(ZMenu.Actions.lanzarMenu());
            }
          },
          () => {}
        );
      }
    );
  };

  const lanzarOpcionAtomica = (opcion: string, tkna:string) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ) => {
    return dispatch(
        despacharEventoCliente(
        ZCommon.Constants.ComandoEnum.CM_EJECSOLOOPCION,
        '',
        {
            opcion
        }
      )
    );
  };

  export const lanzarOpcion = (ctx: string) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ) => {
    dispatch(
      ZclienteResponder.responderEventoCliente(
        ZCommon.Constants.ComandoEnum.CM_EJECOPCION,
        ctx
      )
    ).then(() => {
      //Es un móvil, se debe ocultar el menú programáticamente
      if (window.innerWidth <= 500) {
        let navBarBtn = document.querySelector(
          "button.navbar-toggle"
        ) as HTMLElement;
        navBarBtn.click();
      }
    });
  };

  export const despacharComandoLineaEstado = (
    zcomandoFormaState: IZComandoFormaState
  ) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ): Promise<ResultadoActionConDato<IZColaEventos>> => {
    let zformaTabla: IZFormaTablaState = getState().zPantexStateModule
      .zFormaTablaState.byId[zcomandoFormaState.idZft];
    let zPantexState: IZPantexState = getState().zPantexStateModule
      .pilaPantexState.byId[zcomandoFormaState.px];

    if (
      zPantexState.zFormaTablaStateListIds.length == 1 ||
      zformaTabla.esRegionActiva
    ) {
      return dispatch(
        ZclienteResponder.responderEventoCliente(zcomandoFormaState.cmd)
      );
    }

    return dispatch(
      ZPantexActions.ZPantexStateModule.onSaltarMov(
        zformaTabla,
        zcomandoFormaState.rg
      )
    ).then(() => {
      return dispatch(
        ZclienteResponder.responderEventoCliente(zcomandoFormaState.cmd)
      );
    });
  };

  export const despacharEventoCliente = (
    cmd: ZCommon.Constants.ComandoEnum,
    buffer: string = "",
    optionalParams?: IZEnviarComandoParamsOptional
  ) => (
    dispatch: (p: any) => any,
    getState: () => IZAplState
  ): Promise<ResultadoActionConDato<IZColaEventos>> => {
    return dispatch(ZclienteResponder.responderEventoCliente(cmd, buffer, optionalParams));
  };

  export namespace ZAplState {}
}
