import * as ZCommon from "../zcommon";
import {
  //Models
  ZMenuItemModel,

  //Utils
  EntityMap,
  EntityNormalizedObj,
  IZAplState,
  IZPantex,
  Constants,
  CM,
  IZPantexState,
  IZFormaTablaState,
  IZCampoState,
  ZFormaTablaState as ZFormaTablaStateModel,
  ZCampoState as ZCampoStateModel,
  ZVentanaState as ZVentanaStateModel,
  IZFormaTabla,
  IZComandoFormaState,
  IZVentanaState,
  ZFormaTablaState,
  ZComandoFormaState,
  IZColaEventos,
  IZComandoForma,
} from "../zcommon";

import * as ZMenu from "../zmenu";

import { ActionTypes } from "./actionTypes";
import { ResultadoActionConDato } from "../zutils";

import { Actions as ZAplicacionActions } from "../zaplicacion/actions";
import { Actions as ZColaEventosClienteActions } from "../zcola-eventos-cliente/actions";
import { Selectors } from "./selectors";

export namespace DTO {
  export class DespacharOpcionMenuParamsDTO {
    tipoRecurso: ZCommon.Constants.TipoRecurso;
    idRecurso: string;
    zrecursoViewModelEntityMapOld: EntityMap<any>;
  }
}

export namespace Actions {
  export namespace ZPantexStateModule {
    export const pxCrear = (zPantex: IZPantex, cmd: Constants.ComandoEnum) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      let zFormaTablaState: EntityNormalizedObj<ZFormaTablaState> = new EntityNormalizedObj();
      let zVentanaState: EntityNormalizedObj<IZVentanaState> = new EntityNormalizedObj();
      let zCampoState: EntityNormalizedObj<IZCampoState> = new EntityNormalizedObj();
      let zComandoFormaState: EntityNormalizedObj<IZComandoFormaState> = new EntityNormalizedObj();

      agregarZFormaTablasState(
        getStateFn,
        zPantex,
        zFormaTablaState,
        zVentanaState,
        zCampoState,
        zComandoFormaState,
        cmd
      );

      let pilaPantexState = {
        byId: {
          [zPantex.numPx]: {
            id: zPantex.numPx,
            tipoCmdPantex: cmd,
            zFormaTablaStateListIds: zFormaTablaState.allIds,
          } as IZPantexState,
        } as EntityMap<IZPantexState>,
        allIds: [zPantex.numPx],
      } as EntityNormalizedObj<IZPantexState>;

      dispatch(
        cmPxCrear(
          zPantex.numPx,
          pilaPantexState,
          zFormaTablaState,
          zVentanaState,
          zCampoState,
          zComandoFormaState
        )
      );
    };

    const agregarZFormaTablasState = (
      getStateFn: () => IZAplState,
      zPantex: IZPantex,
      zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
      zVentanaState: EntityNormalizedObj<IZVentanaState>,
      zCampoState: EntityNormalizedObj<IZCampoState>,
      zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>,
      cmd: Constants.ComandoEnum
    ) => {
      let id = Selectors.ZPantexStateModule.ZFormaTablaState.getNextZFormaTablaStateId(
        getStateFn()
      );
      for (let i = 0; i < zPantex.zFormaTablaList.length; i++) {
        zFormaTablaState.byId[id] = new ZFormaTablaStateModel(
          id,
          zPantex.numPx,
          i + 1,
          zPantex.zFormaTablaList[i].cmps.length
        );

        zFormaTablaState.byId[id].esRegionActiva = i == 0;

        zFormaTablaState.byId[id].idZVentana = agregarZVentanaState(
          getStateFn,
          zPantex,
          zPantex.zFormaTablaList[i],
          id,
          zVentanaState
        );

        let camposFijosList: Array<ZCampoStateModel> = [];
        zFormaTablaState.byId[id].zCampoStateListIds = agregarZCamposState(
          getStateFn,
          zPantex,
          zPantex.zFormaTablaList[i],
          camposFijosList,
          i,
          id,
          zCampoState,
          cmd
        );
        zFormaTablaState.byId[id].camposFijosList = camposFijosList;

        zFormaTablaState.byId[id].btnsListIds = agregarZComandosBtnsFormaState(
          getStateFn,
          zPantex,
          zPantex.zFormaTablaList[i],
          i,
          id,
          zComandoFormaState
        );

        zFormaTablaState.byId[
          id
        ].linEstListIds = agregarZComandosLinEstFormaState(
          getStateFn,
          zPantex,
          zPantex.zFormaTablaList[i],
          i,
          id,
          zComandoFormaState
        );

        zFormaTablaState.allIds.push(id);

        id++;
      }
    };

    const agregarZVentanaState = (
      getStateFn: () => IZAplState,
      zPantex: IZPantex,
      zFormaTabla: IZFormaTabla,
      zftId: number,
      zVentanaState: EntityNormalizedObj<IZVentanaState>
    ): number => {
      let zFormaTablaVenId: number = undefined;

      if (!zFormaTabla.ven) {
        return zFormaTablaVenId;
      }

      zFormaTablaVenId = zftId;
      zVentanaState.byId[zFormaTablaVenId] = new ZVentanaStateModel(
        zFormaTabla.ven,
        zFormaTablaVenId
      );
      zVentanaState.allIds.push(zFormaTablaVenId);

      return zFormaTablaVenId;
    };

    const agregarZCamposState = (
      getStateFn: () => IZAplState,
      zPantex: IZPantex,
      zFormaTabla: IZFormaTabla,
      camposFijosList: Array<ZCampoStateModel>,
      indiceZft: number, //indice_zft + 1
      idZft: number,
      zCampoState: EntityNormalizedObj<IZCampoState>,
      cmd: Constants.ComandoEnum
    ): Array<number> => {
      let zFormaTablaCmpsIds = new Array<number>();

      let id = Selectors.ZPantexStateModule.ZCampoState.getNextZCampoStateId(
        getStateFn()
      );

      //No el primer zft
      if (indiceZft != 0) {
        for (let i = 0; i < indiceZft; i++) {
          id = id + zCampoState.allIds.length;
        }
      }

      const region = indiceZft + 1;

      //Es multi
      if (zFormaTabla.ven.numLinsDatos > 0) {
        for (let fila = 0; fila <= zFormaTabla.ven.numLinsDatos; fila++) {
          for (let i = 0; i < zFormaTabla.cmps.length; i++) {
            const zcampoModel = new ZCampoStateModel(
              zFormaTabla.cmps[i],
              id,
              zPantex.numPx,
              region,
              idZft,
              fila
            );

            if (
              cmd == ZCommon.Constants.ComandoEnum.CM_PXCREARZOOM &&
              fila == 0 &&
              i == 0
            ) {
              zcampoModel.autoFocus = true;
            }

            //Campos fijos, ingresarlos sólo una vez en una nueva fila al final
            if (fila == zFormaTabla.ven.numLinsDatos && zcampoModel.esFijo) {
              zcampoModel.fi = -1;
              zCampoState.byId[id] = zcampoModel;
              zCampoState.allIds.push(id);
              zFormaTablaCmpsIds.push(id);
              id++;
              camposFijosList.push(zcampoModel);
              continue;
            }

            if (zcampoModel.esFijo) {
              continue;
            }

            zCampoState.byId[id] = zcampoModel;
            zCampoState.allIds.push(id);
            zFormaTablaCmpsIds.push(id);
            id++;
          }
        }
      } else {
        //No es multi
        for (let i = 0; i < zFormaTabla.cmps.length; i++) {
          zCampoState.byId[id] = new ZCampoStateModel(
            zFormaTabla.cmps[i],
            id,
            zPantex.numPx,
            region,
            idZft,
            undefined
          );
          if (i == 0) {
            zCampoState.byId[id].autoFocus = true;
          }
          zCampoState.allIds.push(id);
          zFormaTablaCmpsIds.push(id);
          if (zFormaTabla.cmps[i].cmps) {
            let parentId = id;
            zCampoState.byId[id].esCampoGrafico = true;
            for (let j = 0; j < zFormaTabla.cmps[i].cmps.length; j++) {
              id++;
              zCampoState.byId[id] = new ZCampoStateModel(
                zFormaTabla.cmps[i].cmps[j],
                id,
                zPantex.numPx,
                region,
                idZft,
                undefined
              );
              zCampoState.byId[id].parentId = parentId;
              zCampoState.allIds.push(id);
              zFormaTablaCmpsIds.push(id);
            }
          }
          id++;
        }
      }

      return zFormaTablaCmpsIds;
    };

    const agregarZComandosBtnsFormaState = (
      getStateFn: () => IZAplState,
      zPantex: IZPantex,
      zFormaTabla: IZFormaTabla,
      indiceZft: number,
      idZft: number,
      zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>
    ): Array<number> => {
      let zFormaTablaBtnsIds: Array<number> = [];

      if (!zFormaTabla.btns) {
        return zFormaTablaBtnsIds;
      }

      let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(
        getStateFn()
      );
      id = id + zComandosFormaState.allIds.length + 1;
      for (let i = 0; i < zFormaTabla.btns.length; i++) {
        zComandosFormaState.byId[id] = new ZComandoFormaState(
          zFormaTabla.btns[i],
          id,
          zPantex.numPx,
          indiceZft + 1,
          idZft
        );
        zComandosFormaState.allIds.push(id);
        zFormaTablaBtnsIds.push(id);
        id++;
      }

      return zFormaTablaBtnsIds;
    };

    const agregarZComandosLinEstFormaState = (
      getStateFn: () => IZAplState,
      zPantex: IZPantex,
      zFormaTabla: IZFormaTabla,
      indiceZft: number,
      idZft: number,
      zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>
    ): Array<number> => {
      let zFormaTablaLinEstIds: Array<number> = [];

      if (!zFormaTabla.linEst) {
        return zFormaTablaLinEstIds;
      }

      let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(
        getStateFn()
      );
      id = id + zComandosFormaState.allIds.length + 1;
      for (let i = 0; i < zFormaTabla.linEst.length; i++) {
        zComandosFormaState.byId[id] = new ZComandoFormaState(
          zFormaTabla.linEst[i],
          id,
          zPantex.numPx,
          indiceZft + 1,
          idZft
        );
        zComandosFormaState.allIds.push(id);
        zFormaTablaLinEstIds.push(id);
        id++;
      }

      return zFormaTablaLinEstIds;
    };

    const cmPxCrear = (
      px: number,
      pilaPantexState: EntityNormalizedObj<IZPantexState>,
      zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
      zVentanaState: EntityNormalizedObj<IZVentanaState>,
      zCampoState: EntityNormalizedObj<IZCampoState>,
      zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_PXCREAR,
      px,
      pilaPantexState,
      zFormaTablaState,
      zVentanaState,
      zCampoState,
      zComandoFormaState,
    });

    export const ponerModal = (
      px: number
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_PONERMODAL,
      px,
    });

    export const quitarModal = (
      px: number
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_QUITARMODAL,
      px,
    });

    export const cmPxArrivar = (
      pxArrivarParams: CM.IPxArrivar
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_PXARRIVAR,
      pxArrivarParams,
    });

    export const cmSincPx = (
      listaPxCampos: Array<number>,
      hashZCampos: Map<string, IZCampoState>,
      listaPxComandos: Array<number>,
      hashZComandos: Map<Constants.ComandoEnum, IZComandoFormaState>,
      cambiarTituloVentana: CM.ICambiarTituloVentana,
      numFilasVisiblesMulti: number,
      numFilasVisiblesMultiPx: number,
      numFilasVisiblesMultiZft: number,
      pxIrALinea: number,
      rgIrALinea: number,
      irALinea: number,
      cambiaFoco: boolean,
      ultimoComandoEnviado: Constants.ComandoEnum
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_SINCPX,
      listaPxCampos,
      hashZCampos,
      listaPxComandos,
      hashZComandos,
      cambiarTituloVentana,
      numFilasVisiblesMulti,
      numFilasVisiblesMultiPx,
      numFilasVisiblesMultiZft,

      pxIrALinea,
      rgIrALinea,
      irALinea,

      cambiaFoco,

      ultimoComandoEnviado,
    });

    export const onCampoChanged = (zcampoState: IZCampoState, valor: any) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      if (valor == "*") {
        dispatch(onCampoChangedEnviarCmd(zcampoState, valor));
      } else {
        dispatch(onCampoChangedInternal(zcampoState, valor));
      }
    };

    export const onCampoChangedInternal = (
      zcampoState: IZCampoState,
      valor: any
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.ON_CAMPOCHANGE,
      zcampoState,
      valor,
    });

    export const onCampoRadioChanged = (
      zcampoState: IZCampoState,
      valor: any
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE,
      zcampoState,
      valor,
    });

    export const onCampoCheckboxChanged = (
      zcampoState: IZCampoState,
      valor: boolean
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.ON_CAMPOCHECKBOXCHANGE,
      zcampoState,
      valor,
    });

    export const setZCampoHaCambiado = (
      px: number,
      idZCampoState: number,
      haCambiado: boolean,
      ponerFoco: boolean
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.SET_ZCAMPOSTATE_HACAMBIADO,
      px,
      idZCampoState,
      haCambiado,
      ponerFoco,
    });

    export const setComandoBuffer = (
      cm: Constants.ComandoEnum,
      buffer: string
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.SET_COMANDOBUFFER,
      cm,
      buffer,
    });

    export const seleccionarFila = (indexFila: number) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      const buffer = `
<cmds>
  <cmd><cmm>${ZCommon.Constants.ComandoEnum.CM_IRALINEA}</cmm><bfm><fi>${indexFila}</fi></bfm></cmd>
  <cmd><cmm>${ZCommon.Constants.ComandoEnum.CM_ACEPTAR}</cmm></cmd>
<cmds>`;
      dispatch(
        setComandoBuffer(ZCommon.Constants.ComandoEnum.CM_ACEPTAR, buffer)
      );
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          ZCommon.Constants.ComandoEnum.CM_PROCESARMULTIEVENTOS,
          buffer
        )
      );
    };

    export const setTituloVentana = (
      parametros: CM.IModificar | CM.IAdicionar | CM.IConsultar
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.SET_TITULOVENTANA,
      parametros,
    });

    export const cmDetallar = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      const buffer = `<nc>${zcampoState.nomCmp}</nc>`;

      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(
          ZAplicacionActions.despacharEventoCliente(
            Constants.ComandoEnum.CM_DETALLAR,
            buffer
          )
        );
        return;
      }

      dispatch(saltarDetallar(zcampoState, zformaTabla));
    };

    export const onCampoFocusIrACmp = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(onCampoFocusIrACmpInternal(zcampoState));
        return;
      }

      //Saltar_irACampo
      dispatch(
        saltarYEjecutarComandos(
          zformaTabla,
          [ //Cola eventos
            getXMLComandoMultiple(
              Constants.ComandoEnum.CM_IRACMP,
              `<nc>${zcampoState.nomCmp}</nc>`
            ),
          ],
          () => { //Success callback function
            dispatch(
              //Poner foco
              setZCampoHaCambiado(zcampoState.px, zcampoState.id, false, true)
            );  
          }
        )
      );
    };

    const onCampoFocusIrACmpInternal = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      const buffer = `<nc>${zcampoState.nomCmp}</nc>`;
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_IRACMP,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          dispatch(
            setZCampoHaCambiado(zcampoState.px, zcampoState.id, false, true)
          );
        }
      );
    };

    const saltarDetallar = (
      zcampoState: IZCampoState,
      zFormaTablaState: IZFormaTablaState
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      let buffer = `<nc>${zcampoState.nomCmp}</nc>`;

      //Ocurrió en un detalle
      if (zcampoState.fi !== undefined) {
        buffer = `<nc>${zcampoState.nomCmp}</nc><fi>${zcampoState.fi}</fi>`;
      }

      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_SALTAR_DETALLAR,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          dispatch(
            setZFormaTablaComoRegionActiva(
              zFormaTablaState.id,
              zFormaTablaState.numPx
            )
          );
          dispatch(
            setZCampoHaCambiado(zcampoState.px, zcampoState.id, false, true)
          );
        }
      );
    };

    export const onCampoChangedEnviarCmd = (
      zcampoState: IZCampoState,
      valor: any
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(onCampoChangedEnviarCmdInternal(zcampoState, valor));
        return;
      }

      dispatch(onSaltarMov(zformaTabla, zcampoState.rg)).then(() => {
        dispatch(onCampoChangedEnviarCmdInternal(zcampoState, valor));
      });
    };

    const onCampoChangedEnviarCmdInternal = (
      zcampoState: IZCampoState,
      valor: any
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      dispatch(onCampoChangedInternal(zcampoState, valor));
      dispatch(
        onCampoBlur(
          Selectors.ZPantexStateModule.ZCampoState.getZCampoStateMap(
            getStateFn()
          ).byId[zcampoState.id]
        )
      );
    };

    export const onCampoBlur = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(onCampoBlurInternal(zcampoState));
        return;
      }

      dispatch(onSaltarMov(zformaTabla, zcampoState.rg)).then(() => {
        dispatch(onCampoBlurInternal(zcampoState));
      });
    };

    const onCampoBlurInternal = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      //jcarvajal: Si el campo tiene error, asi no haya cambiado, toca
      //despachar el evento.

      if (!zcampoState.haCambiado) {
        return;
      }

      let valor = zcampoState.value;

      if (zcampoState.tipo == Constants.TipoCampoEnum.TIPO_DINERO) {
        valor = valor.replace(/,/g, "");
      } else if (zcampoState.tipo == Constants.TipoCampoEnum.TIPO_FECHA) {
        valor = valor.replace(/\//g, "");
      }

      dispatch(
        setZCampoHaCambiado(zcampoState.px, zcampoState.id, false, false)
      );
      dispatch(enviarCmdCambioCmp(zcampoState, valor));
    };

    export const enviarCmdCambioCmp = (
      zcampoState: IZCampoState,
      valor: string
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      const buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${valor}</vc>`;
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_CAMBIOCMP,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          dispatch(ZColaEventosClienteActions.ZColaEventosClienteModule.desEncolarEventoCliente(
            zcampoState.id
          ));
        }
      );
    };

    export const prenderValorBitRadio = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(prenderValorBitRadioInternal(zcampoState));
        return;
      }

      dispatch(onSaltarMov(zformaTabla, zcampoState.rg)).then(() => {
        dispatch(prenderValorBitRadioInternal(zcampoState));
      });
    };

    export const prenderValorBitRadioInternal = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      dispatch(onCampoRadioChanged(zcampoState, zcampoState.lon));
      const buffer = `<nc>${zcampoState.nomCmp}</nc><vc>*</vc><pb>${zcampoState.lon}</pb>`;
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_CAMBIOCMP,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {}
      );
    };

    export const notificarCambioCheckbox = (zcampoState: IZCampoState) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zcampoState.idZft];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zcampoState.px];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(notificarCambioCheckboxInternal(zcampoState));
        return;
      }

      dispatch(onSaltarMov(zformaTabla, zcampoState.rg)).then(() => {
        dispatch(notificarCambioCheckboxInternal(zcampoState));
      });
    };

    export const notificarCambioCheckboxInternal = (
      zcampoState: IZCampoState
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      const value: boolean = !zcampoState.checked;
      dispatch(onCampoCheckboxChanged(zcampoState, value));
      let buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${
        value ? "X" : " "
      }</vc><pb>${zcampoState.lon}</pb>`;
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_CAMBIOCMP,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {}
      );
    };

    export const onFilaMultiSeleccionada = (
      zFormaTablaState: IZFormaTablaState,
      indexFilaMultiSeleccionada: number
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      let zformaTabla: IZFormaTablaState = getStateFn().zPantexStateModule
        .zFormaTablaState.byId[zFormaTablaState.id];
      let zPantexState: IZPantexState = getStateFn().zPantexStateModule
        .pilaPantexState.byId[zFormaTablaState.numPx];
      if (
        zPantexState.zFormaTablaStateListIds.length == 1 ||
        zformaTabla.esRegionActiva
      ) {
        //No ocurrió un saltar
        dispatch(
          onFilaMultiSeleccionadaInternal(
            zFormaTablaState,
            indexFilaMultiSeleccionada
          )
        );
        return;
      }

      //Saltar_irALinea
      dispatch(
        saltarYEjecutarComandos(
          zFormaTablaState,
          [ //Cola de comandos
            getXMLComandoMultiple(
              Constants.ComandoEnum.CM_IRALINEA,
              `<fi>${indexFilaMultiSeleccionada}</fi>`
            ),
          ],
          (buffer:string) => { //Success callback function
            dispatch(setComandoBuffer(Constants.ComandoEnum.CM_ACEPTAR, buffer));
          }
        )
      );
    };

    export const onFilaMultiSeleccionadaInternal = (
      zFormaTablaState: IZFormaTablaState,
      indexFilaMultiSeleccionada: number
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      const buffer = `<fi>${indexFilaMultiSeleccionada}</fi>`;
      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_IRALINEA,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          dispatch(setComandoBuffer(Constants.ComandoEnum.CM_ACEPTAR, buffer));
        }
      );
    };

    export const setFilaMultiSeleccionada = (
      zFormaTablaState: IZFormaTablaState,
      indexFilaMultiSeleccionada: number
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.SET_FILAMULTISELECCIONADA,
      zFormaTablaState,
      indexFilaMultiSeleccionada,
    });

    export const onSaltarMov = (
      zFormaTablaState: IZFormaTablaState,
      regionDestino: number
    ) => (
      dispatch: any,
      getStateFn: () => IZAplState
    ): Promise<ResultadoActionConDato<IZColaEventos>> => {
      const buffer = `<rg>${regionDestino}</rg>`;
      return dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_SALTAR,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          return dispatch(
            setZFormaTablaComoRegionActiva(
              zFormaTablaState.id,
              zFormaTablaState.numPx
            )
          );
        }
      );
    };

    const saltarYEjecutarComandos = (
      zFormaTablaState: IZFormaTablaState,
      bufferCmds: string[],
      successCallbackFn?: (buffer:String) => void
    ) => (dispatch: any, getStateFn: () => IZAplState) => {
      const buffer = `
<cmds>
  ${getXMLComandoMultiple(Constants.ComandoEnum.CM_SALTAR)}
  ${bufferCmds.map((buff) => buff)}
</cmds>`;

      dispatch(
        ZAplicacionActions.despacharEventoCliente(
          Constants.ComandoEnum.CM_PROCESARMULTIEVENTOS,
          buffer
        )
      ).then(
        (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
          dispatch(
            setZFormaTablaComoRegionActiva(
              zFormaTablaState.id,
              zFormaTablaState.numPx
            )
          );          
          if (successCallbackFn !== undefined && typeof successCallbackFn === "function") {
            successCallbackFn(buffer);
          }
        }
      );
    };

    const getXMLComandoMultiple = (
      cmd: Constants.ComandoEnum,
      buffer?: string
    ) => {
      return `
<cmd>
  <cmm>${cmd}</cmm>
  ${buffer?.trim().length > 0 ? `<bfm>${buffer}</bfm>` : ""}
</cmd>`;
    };

    export const setZFormaTablaComoRegionActiva = (
      zftId: number,
      numPx: number
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.SET_ZFORMATABLA_COMOREGIONACTIVA,
      zftId,
      numPx,
    });

    /********************* */
    export const setEsPxModal = (
      esPxModal: boolean
    ): ActionTypes.ZPantexModule.Action => ({
      type: ActionTypes.ZPantexModule.SET_ESPXMODAL,
      esPxModal,
    });

    export const cmPxDestruir = (
      pxDestruirParams: CM.IPxDestruir
    ): ActionTypes.ZPantexStateModule.Action => ({
      type: ActionTypes.ZPantexStateModule.CM_PXDESTRUIR,
      pxDestruirParams,
    });

    export const pxDestruir = (
      pxDestruirParams: CM.IPxDestruir
    ): ActionTypes.ZPantexModule.Action => ({
      type: ActionTypes.ZPantexModule.PX_DESTRUIR,
      pxDestruirParams,
    });
  }

  export const despacharOpcionMenu = (
    zmenuItemModel: ZMenuItemModel
  ): ActionTypes.Action => ({
    type: ZMenu.ActionTypes.DESPACHAR_OPCION_MENU,
    zmenuItemModel: zmenuItemModel,
  });
}
