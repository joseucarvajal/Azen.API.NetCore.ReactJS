import * as ZCommon from "../zcommon";
import {
  IZColaEventos,
  IZAplState,
  IZEvento,
  IZMenu,
  IZPantex,
  IZAplList,
  CM,
  IZCampoState,
  IZComandoFormaState,
  ContractsServices,
  IParametrosActivacionObj,
} from "../zcommon";

import * as ZMenu from "../zmenu";
import * as ZPantex from "../zpantex";
import * as ZLogin from "../zlogin";
import { Constants as ZCommonConstants } from "../zcommon";

import { Actions as ZApppActions } from "../app/actions";

import { Services as ZUtilsServices } from "../zutils";

export namespace Services {
  export namespace Responder {
    //#region Public functions

    //valores de los campos de un px: <nombreCampo, valor>
    let hashZCampoState = new Map<string, IZCampoState>();
    let listaPxCampos: Array<number>; //Lista px para actualizar campos
    let iIrACmpParametros: CM.iIrACmp;

    let cmSincCampoParametros: CM.ISincCampo;
    let cmPrenderControlParametros: CM.IPrenderControl;
    let cmPrenderModoParametros: CM.IPrenderModo;

    let listaPxComandos: Array<number>; //Lista px para actualizar comandos
    let hashZComandoState = new Map<
      ZCommonConstants.ComandoEnum,
      IZComandoFormaState
    >();
    let cmSincBotonParametros: CM.ISincBoton;

    //Sirve para adicionar, modificar, consultar...
    let cmCambiarTituloVentana: CM.ICambiarTituloVentana = undefined;

    let numFilasVisiblesMulti: number;
    let numFilasVisiblesMultiPx: number; //Nro. del px para cambiar num filas visibles multi
    let numFilasVisiblesMultiZft: number; //Nro. del zft para cambiar num filas visibles multi

    let irALinea: number;
    let pxIrALinea: number;
    let rgIrALinea: number;

    let cambiaFoco: boolean;

    export const procesarZColaEventos = (
      zColaEventos: IZColaEventos,
      dispatch: (p: any) => any,
      getState: () => IZAplState
    ) => {
      //valores de los campos de un px: <nombreCampo, valor>
      hashZCampoState = new Map<string, IZCampoState>();
      listaPxCampos = [];
      iIrACmpParametros = undefined;

      hashZComandoState = new Map<
        ZCommonConstants.ComandoEnum,
        IZComandoFormaState
      >();
      listaPxComandos = [];

      cmCambiarTituloVentana = undefined;

      numFilasVisiblesMulti = 0;
      numFilasVisiblesMultiPx = -1;
      numFilasVisiblesMultiZft = -1;

      irALinea = -1;
      pxIrALinea = -1;
      rgIrALinea = -1;

      cambiaFoco = false;

      for (let i = 0; i < zColaEventos?.eventos?.length; i++) {
        ZUtilsServices.parseEventoDataToJSON(zColaEventos.eventos[i]);

        const evento = zColaEventos.eventos[i];
        switch (evento.dato.cmd) {
          //Comandos sincronizar px
          case ZCommonConstants.ComandoEnum.CM_SINCCAMPO:
          case ZCommonConstants.ComandoEnum.CM_CAMBIOCMPASTERISCO:
            cmSincCampo(evento);
            break;

          case ZCommonConstants.ComandoEnum.CM_IRACMP:
            cambiaFoco = true;
            cmIrACmp(evento);
            break;

          case ZCommonConstants.ComandoEnum.CM_PRENDERCONTROL:
            cmPrenderControl(evento, evento.dato.cmd);
            break;

          case ZCommonConstants.ComandoEnum.CM_APAGARCONTROL:
            cmApagarControl(evento, evento.dato.cmd);
            break;

          case ZCommonConstants.ComandoEnum.CM_PRENDERMODO:
            cmPrenderModo(evento, evento.dato.cmd);
            break;

          case ZCommonConstants.ComandoEnum.CM_APAGARMODO:
            cmApagarModo(evento, evento.dato.cmd);
            break;

          case ZCommonConstants.ComandoEnum.CM_SINCBOTON:
            cmSincBoton(evento);
            break;

          case ZCommonConstants.ComandoEnum.CM_IRALINEA:
            pxIrALinea = parseInt((evento.dato.buffer.dato as any).px);
            rgIrALinea = parseInt((evento.dato.buffer.dato as any).rg);
            irALinea = parseInt((evento.dato.buffer.dato as any).fi); //índice linea
            break;

          case ZCommonConstants.ComandoEnum.CM_ADICIONAR:
          case ZCommonConstants.ComandoEnum.CM_MODIFICAR:
          case ZCommonConstants.ComandoEnum.CM_ACTUALIZAR:
          case ZCommonConstants.ComandoEnum.CM_CONSULTAR:
            cmCambiarTituloVentana = evento.dato.buffer
              .dato as CM.ICambiarTituloVentana;
            break;

          case ZCommonConstants.ComandoEnum.CM_PXVISUALIZARRPT:
            downloadReportPopup(
              evento.dato.buffer.dato as CM.IPxVisualizarRpt,
              getState
            );
            break;

          case ZCommonConstants.ComandoEnum.CM_LIMPIARMULTI:
            let limpiarMultiParams = evento.dato.buffer
              .dato as CM.ILimpiarMulti;
            numFilasVisiblesMulti = parseInt(limpiarMultiParams.vc);
            numFilasVisiblesMultiPx = parseInt(
              limpiarMultiParams.px.toString()
            );
            numFilasVisiblesMultiZft = parseInt(
              limpiarMultiParams.rg.toString()
            );
            break;

          //Comandos zft
          case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
          case ZCommon.Constants.ComandoEnum.CM_PXCREARMENSAJE:
          case ZCommon.Constants.ComandoEnum.CM_PXCREARZOOM:
          case ZCommon.Constants.ComandoEnum.CM_PXCREARMOV:
          case ZCommon.Constants.ComandoEnum.CM_PXCREAROCULTO:
            const zPantex = evento.dato.buffer.dato as IZPantex;
            dispatch(
              ZPantex.Actions.ZPantexStateModule.pxCrear(
                zPantex,
                evento.dato.cmd
              )
            );
            break;

          case ZCommon.Constants.ComandoEnum.CM_PXARRIVAR:
            const pxArrivarBuffer = evento.dato.buffer.dato as CM.IPxArrivar;

            const pxArrivarParams = {
              px: pxArrivarBuffer.px,
            } as CM.IPxArrivar;

            dispatch(
              ZPantex.Actions.ZPantexStateModule.cmPxArrivar(pxArrivarParams)
            );

            break;

          case ZCommon.Constants.ComandoEnum.CM_PONERMODAL:
            const ponerModal = evento.dato.buffer.dato as CM.IPonerModal;
            dispatch(
              ZPantex.Actions.ZPantexStateModule.ponerModal(ponerModal.px)
            );
            break;

          case ZCommon.Constants.ComandoEnum.CM_QUITARMODAL:
            const quitarModal = evento.dato.buffer.dato as CM.IQuitarModal;
            dispatch(
              ZPantex.Actions.ZPantexStateModule.quitarModal(quitarModal.px)
            );
            break;

          case ZCommon.Constants.ComandoEnum.CM_PXDESTRUIR:
            const pxDestruir = evento.dato.buffer.dato as CM.IPxDestruir;
            dispatch(
              ZPantex.Actions.ZPantexStateModule.cmPxDestruir(pxDestruir)
            );
            break;

          case ZCommon.Constants.ComandoEnum.CM_TKNA:
            const setTkna = evento.dato.buffer.dato as CM.SetTkna;
            dispatch(ZLogin.Actions.ZLoginModule.setTkna(setTkna.tkna));
            break;

          case ZCommon.Constants.ComandoEnum.CM_TKNS:
            const setTkns = evento.dato.buffer.dato as CM.SetTkns;
            dispatch(ZLogin.Actions.ZLoginModule.setTkns(setTkns.tkns));
            break;

          //Comandos menu
          case ZCommon.Constants.ComandoEnum.CM_DEFMENU:
            const zmenu = evento.dato.buffer.dato as IZMenu;
            dispatch(ZMenu.Actions.ZMenuModule.setZMenu(zmenu));
            break;

          case ZCommon.Constants.ComandoEnum.CM_SINCCOM:
            const lanzarAplPuertoObj = evento.dato.buffer
              .dato as CM.ILanzarAplRpta;
            sessionStorage.setItem(
              ZCommon.Constants.SessionStorageKeyEnum.AZEN_PUERTO,
              lanzarAplPuertoObj.psc.toString()
            );
            dispatch(ZLogin.Actions.ZLoginModule.setPassword(""));
            break;

          case ZCommon.Constants.ComandoEnum.CM_SINCPAR:
            let parametrosActivacionComp: Array<string> = (evento.dato.buffer
              .dato as CM.ISincBaseValor).vc.split("|");

            let parametrosActivacionObj = {} as IParametrosActivacionObj;

            if (parametrosActivacionComp.length > 0) {
              parametrosActivacionObj = {
                mes: parametrosActivacionComp[0],
                anio: parseInt(parametrosActivacionComp[1]),
                bd: parametrosActivacionComp[2],
                usuario: parametrosActivacionComp[3],
                uid: parametrosActivacionComp[4],
                numeroMes: ZCommonConstants.mesNroMes.get(
                  parametrosActivacionComp[0].toLowerCase()
                ),
              } as IParametrosActivacionObj;
            }
            dispatch(
              ZApppActions.setParametrosActivacionObj(parametrosActivacionObj)
            );
            break;

          //Comandos aplicación
          case ZCommon.Constants.ComandoEnum.CM_APLICACION:
            const zAplList = evento.dato.buffer.dato as IZAplList;
            dispatch(ZLogin.Actions.ZLoginModule.setZAplList(zAplList));
            break;

          case ZCommon.Constants.ComandoEnum.CM_PUERTO:
            let lanzarAppParams = evento.dato.buffer
              .dato as ZCommon.CM.ILanzarAplRpta;
            sessionStorage.setItem(
              ZCommon.Constants.SessionStorageKeyEnum.AZEN_PUERTO,
              lanzarAppParams.psc.toString()
            );
            break;

          case ZCommon.Constants.ComandoEnum.CM_SALIR:
            window.close();
            break;
        }
      }

      if (getState().nivelLog == 1) {
        console.log("campos px|region|fila");
        console.log(hashZCampoState);

        console.log("comandos px|region|fila");
        console.log(hashZComandoState);
      }

      //Hay campos para sincronizar
      if (
        hashZCampoState.size > 0 ||
        hashZComandoState.size > 1 ||
        numFilasVisiblesMulti > 0
      ) {
        dispatch(
          ZPantex.Actions.ZPantexStateModule.cmSincPx(
            listaPxCampos,
            hashZCampoState,
            listaPxComandos,
            hashZComandoState,
            cmCambiarTituloVentana,
            numFilasVisiblesMulti,
            numFilasVisiblesMultiPx,
            numFilasVisiblesMultiZft,
            pxIrALinea,
            rgIrALinea,
            irALinea,
            cambiaFoco,
            getState().ultimoComandoEnviado
          )
        );
      } else {
        if (cmCambiarTituloVentana) {
          dispatch(
            ZPantex.Actions.ZPantexStateModule.setTituloVentana(
              cmCambiarTituloVentana
            )
          );
        }
      }
    };

    const cmSincCampo = (infoEvento: IZEvento) => {
      cmSincCampoParametros = infoEvento.dato.buffer.dato as CM.ISincCampo;
      let hashKey = ContractsServices.getSincHashKey(cmSincCampoParametros);

      cmSincCampoParametros.px = parseInt(cmSincCampoParametros.px.toString());
      if (listaPxCampos.indexOf(cmSincCampoParametros.px) == -1) {
        listaPxCampos.push(cmSincCampoParametros.px);
      }

      cmSincCampoParametros.fi = cmSincCampoParametros.fi
        ? parseInt(cmSincCampoParametros.fi.toString())
        : cmSincCampoParametros.fi;

      if (!hashZCampoState.has(hashKey)) {
        let zCampoEnHash = {
          px: cmSincCampoParametros.px,
          value: cmSincCampoParametros.vc,
          rg: cmSincCampoParametros.rg,
          fi: cmSincCampoParametros.fi,
        } as IZCampoState;

        //Es radio o checkbox
        if (cmSincCampoParametros.pb || cmSincCampoParametros.pb == 0) {
          zCampoEnHash.posBitsOn = [];
          zCampoEnHash.posBitsOff = [];
          if (
            cmSincCampoParametros.vc == "*" ||
            cmSincCampoParametros.vc == "X"
          ) {
            //Radio
            zCampoEnHash.posBitsOn[0] = parseInt(
              cmSincCampoParametros.pb.toString()
            );
          } else {
            zCampoEnHash.posBitsOff[0] = parseInt(
              cmSincCampoParametros.pb.toString()
            );
          }
        }

        hashZCampoState.set(hashKey, zCampoEnHash);
      } else {
        const zCampoEnHash = hashZCampoState.get(hashKey);
        zCampoEnHash.value = cmSincCampoParametros.vc;
        (zCampoEnHash.value = cmSincCampoParametros.vc),
          (zCampoEnHash.rg = cmSincCampoParametros.rg),
          (zCampoEnHash.fi = cmSincCampoParametros.fi);

        //Es radio o checkbox
        if (cmSincCampoParametros.pb) {
          if (!zCampoEnHash.posBitsOn) {
            zCampoEnHash.posBitsOn = [];
          }
          if (!zCampoEnHash.posBitsOff) {
            zCampoEnHash.posBitsOff = [];
          }

          let indxOn = zCampoEnHash.posBitsOn.indexOf(
            parseInt(cmSincCampoParametros.pb.toString())
          );
          let indxOff = zCampoEnHash.posBitsOff.indexOf(
            parseInt(cmSincCampoParametros.pb.toString())
          );

          if (cmSincCampoParametros.vc == "*") {
            //Radio
            zCampoEnHash.posBitsOn[0] = parseInt(
              cmSincCampoParametros.pb.toString()
            );
          } else if (cmSincCampoParametros.vc == "X") {
            //Checkbox
            if (indxOn == -1) {
              zCampoEnHash.posBitsOn.push(
                parseInt(cmSincCampoParametros.pb.toString())
              );
              if (indxOff != -1) {
                zCampoEnHash.posBitsOff.splice(indxOff, 1);
              }
            }
          } else {
            if (indxOff == -1) {
              zCampoEnHash.posBitsOff.push(
                parseInt(cmSincCampoParametros.pb.toString())
              );
              if (indxOn != -1) {
                zCampoEnHash.posBitsOn.splice(indxOn, 1);
              }
            }
          }
        }
      }
    };

    const downloadReportForceDownload = (
      visualRtpParams: CM.IPxVisualizarRpt,
      getState: () => IZAplState
    ) => {
        const downloadURL = `${ZUtilsServices.trimLasCharacter(
        getState().azenURL,
        "/"
      )}/api/downloadreport/${visualRtpParams.vc}`;

      fetch(downloadURL, {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${getState().zLoginModule.tkns}`,
        }),
      })
        .then((response) => response.blob())
        .then((blob) => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = visualRtpParams.vc;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove(); //afterwards we remove the element again
        });
    };

    const downloadReportPopup = (
      visualRtpParams: CM.IPxVisualizarRpt,
      getState: () => IZAplState
    ) => {
      let rptWindow = window.open(
          `${ZUtilsServices.trimLasCharacter(getState().azenURL, "/")}/downloadreport/${
          visualRtpParams.vc
        }`,
        "",
        "location=0"
      );

      if(!rptWindow){
        alert('Por favor habilite las ventanas emergentes en su navegador');
        return;
      }

      if (visualRtpParams.vc.endsWith(".txt")) {
        rptWindow.addEventListener(
          "load",
          function () {
            let preElementsArray: any;
            preElementsArray = rptWindow.document.body.getElementsByTagName(
              "pre"
            );
            if (preElementsArray && preElementsArray.length > 0) {
              preElementsArray[0].removeAttribute("style");
            }
          },
          true
        );
      }
    };

    const cmIrACmp = (infoEvento: IZEvento) => {
      iIrACmpParametros = infoEvento.dato.buffer.dato as CM.iIrACmp;
      let hashKey = ContractsServices.getSincHashKey(iIrACmpParametros);

      if (!hashZCampoState.has(hashKey)) {
        let zCampoEnHash = {
          autoFocus: true,
        } as IZCampoState;

        hashZCampoState.set(hashKey, zCampoEnHash);
      } else {
        const zCampoEnHash = hashZCampoState.get(hashKey);
        zCampoEnHash.autoFocus = true;
      }
    };

    const cmPrenderControl = (
      infoEvento: IZEvento,
      cmd: ZCommonConstants.ComandoEnum
    ) => {
      cmPrenderControlParametros = infoEvento.dato.buffer
        .dato as CM.IPrenderControl;
      let hashKey = ContractsServices.getSincHashKey(
        cmPrenderControlParametros
      );
      if (!hashZCampoState.has(hashKey)) {
        hashZCampoState.set(hashKey, {
          bitPrenderControl: Math.log2(cmPrenderControlParametros.mc),
        } as IZCampoState);
      } else {
        hashZCampoState.get(hashKey).bitPrenderControl = Math.log2(
          cmPrenderControlParametros.mc
        );
      }
    };

    const cmApagarControl = (
      infoEvento: IZEvento,
      cmd: ZCommonConstants.ComandoEnum
    ) => {
      cmPrenderControlParametros = infoEvento.dato.buffer
        .dato as CM.IPrenderControl;
      let hashKey = ContractsServices.getSincHashKey(
        cmPrenderControlParametros
      );
      if (!hashZCampoState.has(hashKey)) {
        hashZCampoState.set(hashKey, {
          bitApagarControl: Math.log2(cmPrenderControlParametros.mc),
        } as IZCampoState);
      } else {
        hashZCampoState.get(hashKey).bitApagarControl = Math.log2(
          cmPrenderControlParametros.mc
        );
      }
    };

    const cmPrenderModo = (
      infoEvento: IZEvento,
      cmd: ZCommonConstants.ComandoEnum
    ) => {
      cmPrenderModoParametros = infoEvento.dato.buffer.dato as CM.IPrenderModo;
      let hashKey = ContractsServices.getSincHashKey(cmPrenderModoParametros);
      if (!hashZCampoState.has(hashKey)) {
        hashZCampoState.set(hashKey, {
          bitPrenderModo: Math.log2(cmPrenderModoParametros.mc),
        } as IZCampoState);
      } else {
        hashZCampoState.get(hashKey).bitPrenderModo = Math.log2(
          cmPrenderModoParametros.mc
        );
      }
    };

    const cmApagarModo = (
      infoEvento: IZEvento,
      cmd: ZCommonConstants.ComandoEnum
    ) => {
      cmPrenderModoParametros = infoEvento.dato.buffer.dato as CM.IPrenderModo;
      let hashKey = ContractsServices.getSincHashKey(cmPrenderModoParametros);
      if (!hashZCampoState.has(hashKey)) {
        hashZCampoState.set(hashKey, {
          bitApagarModo: Math.log2(cmPrenderModoParametros.mc),
        } as IZCampoState);
      } else {
        hashZCampoState.get(hashKey).bitApagarModo = Math.log2(
          cmPrenderModoParametros.mc
        );
      }
    };

    const cmSincBoton = (infoEvento: IZEvento) => {
      cmSincBotonParametros = infoEvento.dato.buffer.dato as CM.ISincBoton;
      cmSincBotonParametros.px = parseInt(cmSincBotonParametros.px.toString());
      cmSincBotonParametros.nc = parseInt(cmSincBotonParametros.nc.toString());
      if (listaPxComandos.indexOf(cmSincBotonParametros.px) == -1) {
        listaPxComandos.push(cmSincBotonParametros.px);
      }
      if (!hashZComandoState.has(cmSincBotonParametros.nc)) {
        let zComandFormaEnHash = {
          desh: parseInt(cmSincBotonParametros.vc.toString()),
        } as IZComandoFormaState;

        hashZComandoState.set(cmSincBotonParametros.nc, zComandFormaEnHash);
      } else {
        const zComandFormaEnHash = hashZComandoState.get(
          cmSincBotonParametros.nc
        );
        zComandFormaEnHash.desh = parseInt(cmSincBotonParametros.vc.toString());
      }
    };
    //#endregion
  }
}
