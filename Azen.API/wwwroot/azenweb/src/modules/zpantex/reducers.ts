
const u = require('updeep');

import {
    //Utils
    EntityNormalizedObj,
    IZPantexModule,
    IZPantex,
    IZPantexState,
    IZPantexStateModule,
    IZFormaTablaState,
    IZCampoState,
    IZComandoFormaState,
    IZVentanaState,
    Constants as ZCommonConstants,
    ContractsServices,
    IZParametrosComando

} from '../zcommon';

import {
    Services as ZUtilsServices
} from "../zutils";

import { ActionTypes } from './actionTypes';

export namespace Reducers {

    export namespace ZPantexModule {

        const zPantexModule = {
            pilaPantex: [],
            pxAlTope: -1,
        } as IZPantexModule;

        export const impl = (state: IZPantexModule = zPantexModule, action: ActionTypes.ZPantexModule.Action) => {

            let indxZPantex = 0;
            switch (action.type) {
                case ActionTypes.ZPantexModule.CM_PXCREAR:

                    indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.zPantex.numPx;
                        }
                    );

                    if (indxZPantex == -1) {
                        return u({
                            pilaPantex: [...state.pilaPantex, action.zPantex],
                            pxAlTope: action.zPantex.numPx,
                        } as IZPantexModule, state);
                    }
                    break;

                case ActionTypes.ZPantexModule.CM_PXARRIVAR:

                    indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.pxArrivar.px
                        }
                    );

                    if (indxZPantex != state.pilaPantex.length - 1) { //Para no renderizar dos veces con CM_PXCREAR y CM_PXARRIVAR
                        let clonPilaPantex = JSON.parse(JSON.stringify(state.pilaPantex));
                        let zPantex: IZPantex = clonPilaPantex[indxZPantex];
                        let newPilaPantex = clonPilaPantex.slice(0, indxZPantex).concat(clonPilaPantex.slice(indxZPantex + 1));
                        newPilaPantex = [...newPilaPantex, zPantex];
                        return u({
                            pxAlTope: action.pxArrivar.px,
                            pilaPantex: newPilaPantex
                        } as IZPantexModule, state);
                    }
                    break;

                case ActionTypes.ZPantexModule.PX_DESTRUIR: {
                    const pilaPantex = state.pilaPantex;

                    const indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.pxDestruirParams.px
                        }
                    );

                    if (indxZPantex == -1) {
                        console.error("zPantex/reducers: px no encontrado");
                        return state;
                    }

                    return u({
                        pilaPantex: pilaPantex.slice(0, indxZPantex).concat(pilaPantex.slice(indxZPantex + 1)),
                    } as IZPantexModule, state);
                }
            }

            return state;
        }
    }

    export namespace ZPantexStateModule {
        const zPantexStateModuleInicial = {
            pilaPx: [],
            pxAlTope: -1,
            ponerModal: false,
            pilaPantexState: new EntityNormalizedObj(),
            zFormaTablaState: new EntityNormalizedObj(),
            zVentanaState: new EntityNormalizedObj(),
            zCampoState: new EntityNormalizedObj(),
            zComandoFormaState: new EntityNormalizedObj(),
            zParametrosComando: {
                byId: {
                    [ZCommonConstants.ComandoEnum.CM_ACEPTAR]: {
                        id: ZCommonConstants.ComandoEnum.CM_ACEPTAR,
                        buffer: ""
                    }
                },
                allIds: [ZCommonConstants.ComandoEnum.CM_ACEPTAR]
            }
        } as IZPantexStateModule;

        export const impl = (state: IZPantexStateModule = zPantexStateModuleInicial, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            switch (action.type) {

                case ActionTypes.ZPantexStateModule.CM_PXCREAR:
                    return cmPxCrear(state, action);

                case ActionTypes.ZPantexStateModule.CM_PXDESTRUIR:
                    return cmPxDestruir(state, action);

                case ActionTypes.ZPantexStateModule.CM_PXARRIVAR:
                    return cmPxArrivar(state, action);

                case ActionTypes.ZPantexStateModule.CM_PONERMODAL:
                    return u({
                        pilaPantexState: {
                            byId: {
                                [action.px]: {
                                    esModal: true,
                                } as IZPantexState
                            }
                        } as EntityNormalizedObj<IZPantexState>,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.CM_QUITARMODAL:
                    return u({
                        pilaPantexState: {
                            byId: {
                                [action.px]: {
                                    esModal: false,
                                } as IZPantexState
                            }
                        } as EntityNormalizedObj<IZPantexState>,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.CM_SINCPX:
                    return cmSincPx(state, action);

                case ActionTypes.ZPantexStateModule.ON_CAMPOCHANGE:
                    return u({
                        zCampoState: {
                            byId: {
                                [action.zcampoState.id]: {
                                    value: action.valor,
                                    haCambiado: true,
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE:
                    return onCampoRadioChange(state, action);

                case ActionTypes.ZPantexStateModule.ON_CAMPOCHECKBOXCHANGE:
                    return u({
                        zCampoState: {
                            byId: {
                                [action.zcampoState.id]: {
                                    checked: action.valor,
                                    haCambiado: true,
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.SET_ZCAMPOSTATE_HACAMBIADO:
                    return setZCampoStateHaCambiado(state, action);

                case ActionTypes.ZPantexStateModule.SET_FILAMULTISELECCIONADA:
                    return u({
                        zFormaTablaState: {
                            byId: {
                                [action.zFormaTablaState.id]: {
                                    indexFilaMultiSeleccionada: action.indexFilaMultiSeleccionada
                                } as IZFormaTablaState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.SET_COMANDOBUFFER:
                    return u({
                        zParametrosComando: {
                            byId: {
                                [action.cm]: {
                                    buffer: action.buffer
                                } as IZParametrosComando
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.SET_TITULOVENTANA:
                    return u({
                        zVentanaState: {
                            byId: {
                                [action.parametros.px]: {
                                    buffer: action.parametros.vc
                                } as IZParametrosComando
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.SET_ZFORMATABLA_COMOREGIONACTIVA:
                    return setZFormaTablaComoRegionActiva(state, action);
            }

            return state;
        }

        const setZCampoStateHaCambiado = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.SET_ZCAMPOSTATE_HACAMBIADO) {
                return state;
            }

            const fnActualizarZCampo = (zcampoState: IZCampoState): IZCampoState => {

                if (zcampoState.px != action.px) {
                    return zcampoState;
                }

                if (zcampoState.id == action.idZCampoState && zcampoState.etq.trim() == "Que") {
                    return zcampoState;
                }

                if (zcampoState.id == action.idZCampoState) {
                    return u({
                        autoFocus: zcampoState.id == action.idZCampoState,
                        haCambiado: action.haCambiado,
                    } as IZCampoState, zcampoState);
                }

                return u({
                    autoFocus: false,
                } as IZCampoState, zcampoState);
            }

            return u({
                zCampoState: {
                    byId: u.map(fnActualizarZCampo)
                } as any,
            } as IZPantexStateModule, state);
        }

        const cmPxCrear = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {
            if (action.type != ActionTypes.ZPantexStateModule.CM_PXCREAR) {
                return state;
            }
            return {
                pilaPx: [...state.pilaPx, action.px],
                pxAlTope: action.px,
                pilaPantexState: {
                    byId: { ...state.pilaPantexState.byId, ...action.pilaPantexState.byId },
                    allIds: [...state.pilaPantexState.allIds, ...action.pilaPantexState.allIds],
                },
                zFormaTablaState: {
                    byId: { ...state.zFormaTablaState.byId, ...action.zFormaTablaState.byId },
                    allIds: [...state.zFormaTablaState.allIds, ...action.zFormaTablaState.allIds],
                },
                zVentanaState: {
                    byId: { ...state.zVentanaState.byId, ...action.zVentanaState.byId },
                    allIds: [...state.zVentanaState.allIds, ...action.zVentanaState.allIds],
                },
                zCampoState: {
                    byId: { ...state.zCampoState.byId, ...action.zCampoState.byId },
                    allIds: [...state.zCampoState.allIds, ...action.zCampoState.allIds],
                } as EntityNormalizedObj<IZCampoState>,
                zComandoFormaState: {
                    byId: { ...state.zComandoFormaState.byId, ...action.zComandoFormaState.byId },
                    allIds: [...state.zComandoFormaState.allIds, ...action.zComandoFormaState.allIds],
                },
            } as IZPantexStateModule;
        }

        const cmPxDestruir = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.CM_PXDESTRUIR) {
                return state;
            }

            let indicePxDestruir = state.pilaPx.indexOf(parseInt(action.pxDestruirParams.px.toString()));
            if (indicePxDestruir != -1) {

                let zformaTablasADestruirIds = new Array<number>();
                let zVentanaADestuirIds = new Array<number>();
                let zcamposADestruirIds = new Array<number>();
                let zcomandosLinEstADestruirIds = new Array<number>();
                let zcomandosBtnsADestruirIds = new Array<number>();

                if (state.pilaPantexState.byId[action.pxDestruirParams.px].zFormaTablaStateListIds) {
                    for (let iZFormaTabla = 0; iZFormaTabla < state.pilaPantexState.byId[action.pxDestruirParams.px].zFormaTablaStateListIds.length; iZFormaTabla++) {

                        const idZFormaTabla = state.pilaPantexState.byId[action.pxDestruirParams.px].zFormaTablaStateListIds[iZFormaTabla];
                        zformaTablasADestruirIds = [...zformaTablasADestruirIds, idZFormaTabla];

                        const zFormaTabla = state.zFormaTablaState.byId[idZFormaTabla];
                        //zventana
                        if (zFormaTabla) {
                            zVentanaADestuirIds = [...zVentanaADestuirIds, zFormaTabla.idZVentana];
                        }

                        //zcampos
                        zcamposADestruirIds = [...zcamposADestruirIds, ...zFormaTabla.zCampoStateListIds];

                        //linest
                        zcomandosLinEstADestruirIds = [...zcomandosLinEstADestruirIds, ...zFormaTabla.linEstListIds];

                        //btns
                        zcomandosBtnsADestruirIds = [...zcomandosBtnsADestruirIds, ...zFormaTabla.btnsListIds];
                    }
                }

                const eliminarZPantexIdFn = (zPantexId: number) => {
                    return zPantexId == action.pxDestruirParams.px;
                }

                const eliminarZFormaTablasIdsFn = (zFormaTablaId: number) => {
                    return zformaTablasADestruirIds.indexOf(zFormaTablaId) != -1;
                }

                const eliminarZVentanasIdsFn = (zVentanaId: number) => {
                    return zformaTablasADestruirIds.indexOf(zVentanaId) != -1;
                }

                const eliminarZCamposIdsFn = (zCampoId: number) => {
                    return zcamposADestruirIds.indexOf(zCampoId) != -1;
                }

                const eliminarZComandosIdsFn = (zComandoId: number) => {
                    return zcomandosLinEstADestruirIds.indexOf(zComandoId) != -1
                        || zcomandosBtnsADestruirIds.indexOf(zComandoId) != -1;
                }

                return u({
                    pilaPx: u.reject(eliminarZPantexIdFn), //state.pilaPx.slice(0, indicePxDestruir).concat(state.pilaPx.slice(indicePxDestruir + 1)),
                    pxAlTope: state.pilaPx.length > 1 ? state.pilaPx[state.pilaPx.length - 2] : -1,
                    pilaPantexState: {
                        byId: u.omit(action.pxDestruirParams.px),
                        allIds: u.reject(eliminarZPantexIdFn)
                    } as EntityNormalizedObj<IZPantexState>,
                    zFormaTablaState: {
                        byId: u.omit(zformaTablasADestruirIds),
                        allIds: u.reject(eliminarZFormaTablasIdsFn)
                    } as EntityNormalizedObj<IZFormaTablaState>,
                    zVentanaState: {
                        byId: u.omit(zVentanaADestuirIds),
                        allIds: u.reject(eliminarZVentanasIdsFn)
                    } as EntityNormalizedObj<IZVentanaState>,
                    zCampoState: {
                        byId: u.omit(zcamposADestruirIds),
                        allIds: u.reject(eliminarZCamposIdsFn)
                    } as EntityNormalizedObj<IZCampoState>,
                    zComandoFormaState: {
                        byId: u.omit([...zcomandosLinEstADestruirIds, ...zcomandosBtnsADestruirIds]),
                        allIds: u.reject(eliminarZComandosIdsFn)
                    } as EntityNormalizedObj<IZComandoFormaState>,
                } as IZPantexStateModule, state);
            }

            return state;
        }

        const cmPxArrivar = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.CM_PXARRIVAR) {
                return state;
            }

            let indicePxArrivar = state.pilaPx.indexOf(parseInt(action.pxArrivarParams.px.toString()));

            //Es diferente del último en la pila, se debe reacomodar
            if (indicePxArrivar != -1 &&
                state.pilaPx[indicePxArrivar] != state.pilaPx[state.pilaPx.length - 1]) {
                return u({
                    pilaPx: ZUtilsServices.Inmutable.intercambiarElementosArray(state.pilaPx, state.pilaPx[indicePxArrivar], state.pilaPx[state.pilaPx.length - 1]),
                    pxAlTope: action.pxArrivarParams.px
                } as IZPantexStateModule, state);
            }

            return state;
        }

        const cmSincPx = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.CM_SINCPX) {
                return state;
            }

            const fnActualizarZCampo = (zcampoState: IZCampoState): IZCampoState => {

                if (action.listaPxCampos.indexOf(zcampoState.px) != -1) {

                    let key = zcampoState.nomCmp;
                    if (zcampoState.fi != undefined) {
                        key = ContractsServices.getSincHashCampo(zcampoState);
                    }

                    if (action.hashZCampos.has(key)) {
                        const zCampoEnHash = action.hashZCampos.get(key);

                        if (zCampoEnHash.fi) {
                            if (zcampoState.rg != zCampoEnHash.rg || zcampoState.fi != zCampoEnHash.fi) {
                                return zcampoState;
                            }
                        }

                        let zCampoActualizado = {

                            value: zCampoEnHash.value == undefined
                                ? zcampoState.value
                                : zCampoEnHash.value,

                            checked: zcampoState.checked,

                            control: zcampoState.control,
                            modo: zcampoState.modo,

                            autoFocus: zCampoEnHash.autoFocus != undefined
                                ? zCampoEnHash.autoFocus
                                : action.cambiaFoco ? false : zcampoState.autoFocus,

                        } as IZCampoState;

                        //Verificar si es radio y viene prendido (arreglo: posBitOn)
                        if (zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO) {
                            if (zCampoEnHash.posBitsOn) {
                                if (zCampoEnHash.posBitsOn.indexOf(zcampoState.lon) != -1) {
                                    zCampoActualizado.checked = true;
                                } else {
                                    zCampoActualizado.checked = false;
                                }
                            }
                        }
                        else if (zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                            if (zCampoEnHash.posBitsOn) {
                                if (zCampoEnHash.posBitsOn.indexOf(zcampoState.lon) != -1) {
                                    zCampoActualizado.checked = true;
                                }
                            }
                            if (zCampoEnHash.posBitsOff) {
                                if (zCampoEnHash.posBitsOff.indexOf(zcampoState.lon) != -1) {
                                    zCampoActualizado.checked = false;
                                }
                            }
                        }

                        if (zCampoEnHash.bitPrenderControl) {
                            zCampoActualizado.control = ContractsServices.Binario.prenderBit(zcampoState.control, zCampoEnHash.bitPrenderControl);
                        }

                        if (zCampoEnHash.bitApagarControl) {
                            zCampoActualizado.control = ContractsServices.Binario.apagarBit(zcampoState.control, zCampoEnHash.bitApagarControl);
                        }

                        if (zCampoEnHash.bitPrenderModo) {
                            zCampoActualizado.modo = ContractsServices.Binario.prenderBit(zcampoState.modo, zCampoEnHash.bitPrenderModo);
                        }

                        if (zCampoEnHash.bitApagarModo) {
                            zCampoActualizado.modo = ContractsServices.Binario.apagarBit(zcampoState.modo, zCampoEnHash.bitApagarModo);
                        }

                        let readOnly = ContractsServices.esCampoControlLectura(zCampoActualizado.control)
                            || ContractsServices.esCampoModoLectura(zCampoActualizado.modo);

                        return u({
                            value: zCampoActualizado.value,
                            checked: zCampoActualizado.checked, //para radio/checkbox
                            control: zCampoActualizado.control,
                            modo: zCampoActualizado.modo,
                            readOnly: ContractsServices.esCampoControlLectura(zCampoActualizado.control)
                                || ContractsServices.esCampoModoLectura(zCampoActualizado.modo),
                            noArrivable: ContractsServices.Binario.estaPrendidoBit(zCampoActualizado.modo, ZCommonConstants.ModoCampoEnum.ZCMP_MNOARRIVABLE),
                            autoFocus: zCampoActualizado.autoFocus,
                        } as IZCampoState, zcampoState);
                    } else { //El campo no cambió, pero probablemente perdió el foco
                        if (action.cambiaFoco) {
                            return u({
                                autoFocus: false,
                            } as IZCampoState, zcampoState);
                        }
                    }
                } else {
                    if (action.cambiaFoco) {
                        return u({
                            autoFocus: false,
                        } as IZCampoState, zcampoState);
                    }
                }

                return zcampoState;
            }

            const fnActualizarBoton = (zcomandoFormaState: IZComandoFormaState): IZComandoFormaState => {

                if (action.listaPxComandos.indexOf(zcomandoFormaState.px) != -1) {
                    if (action.hashZComandos.has(zcomandoFormaState.cmd)) {
                        const zComandoFormaEnHash = action.hashZComandos.get(zcomandoFormaState.cmd);
                        return u({
                            desh: zComandoFormaEnHash.desh
                        } as IZComandoFormaState, zcomandoFormaState);
                    }
                }

                return zcomandoFormaState;
            }

            const fnActualizarVentana = (zVentanaState: IZVentanaState): IZVentanaState => {

                if (action.cambiarTituloVentana
                    && zVentanaState.id == action.cambiarTituloVentana.px) {
                    return u({
                        descr: action.cambiarTituloVentana.vc,
                    } as IZVentanaState, zVentanaState);
                }

                return zVentanaState;
            }

            const fnActualizarZFormaTabla = (zFormaTabla: IZFormaTablaState): IZFormaTablaState => {

                if (action.numFilasVisiblesMultiPx == zFormaTabla.numPx) {
                    return u({
                        numFilasVisiblesMulti: action.numFilasVisiblesMulti,
                        indexFilaMultiSeleccionada: action.irALinea != -1 ? action.irALinea : zFormaTabla.indexFilaMultiSeleccionada
                    } as IZFormaTablaState, zFormaTabla);
                }

                if (action.irALinea != -1
                    && (zFormaTabla.numPx == action.pxIrALinea && zFormaTabla.rg == action.rgIrALinea)) {
                    return u({
                        indexFilaMultiSeleccionada: action.irALinea
                    } as IZFormaTablaState, zFormaTabla);
                }

                return zFormaTabla;
            }

            if (action.hashZCampos.size > 0 || action.hashZComandos.size > 0) {
                return u({
                    zCampoState: {
                        byId: u.map(fnActualizarZCampo)
                    } as any,
                    zComandoFormaState: {
                        byId: u.map(fnActualizarBoton)
                    } as any,
                    zVentanaState: {
                        byId: u.map(fnActualizarVentana)
                    },
                    zFormaTablaState: {
                        byId: u.map(fnActualizarZFormaTabla)
                    }
                } as IZPantexStateModule, state);
            }

            return state;
        }

        const onCampoRadioChange = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE) {
                return state;
            }

            let zcampoRadioPadre: IZCampoState = state.zCampoState.byId[action.zcampoState.parentId];
            if (!zcampoRadioPadre) {
                console.error("Campo " + action.zcampoState.nomCmp + " no tiene parentId asociado");
                return state;
            }

            const actualizarCamposRadios = (zcampoState: IZCampoState): IZCampoState => {

                if (zcampoState.px == action.zcampoState.px) {
                    if (zcampoState.parentId == zcampoRadioPadre.id) {
                        if (zcampoState.id == action.zcampoState.id) {
                            return u({
                                checked: true,
                            } as IZCampoState, zcampoState);
                        }
                        return u({
                            checked: false,
                        } as IZCampoState, zcampoState);
                    }
                }

                return zcampoState;
            }

            return u({
                zCampoState: {
                    byId: u.map(actualizarCamposRadios)
                } as any,
            } as IZPantexStateModule, state);
        }

        const setZFormaTablaComoRegionActiva = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.SET_ZFORMATABLA_COMOREGIONACTIVA) {
                return state;
            }

            const actualizarZFormaTabla = (zFormaTablaState: IZFormaTablaState): IZFormaTablaState => {

                if (zFormaTablaState.numPx != action.numPx) {
                    return zFormaTablaState;
                }

                if (zFormaTablaState.id == action.zftId) {
                    return u({
                        esRegionActiva: true
                    } as IZFormaTablaState, zFormaTablaState);
                }

                return u({
                    esRegionActiva: false
                } as IZFormaTablaState, zFormaTablaState);
            }

            return u({
                zFormaTablaState: {
                    byId: u.map(actualizarZFormaTabla)
                } as any,
            } as IZPantexStateModule, state);
        }
    }
}

