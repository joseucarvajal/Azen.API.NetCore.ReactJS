import { createSelector } from 'reselect';

import {
    //Utils
    EntityNormalizedObj,
    IZAplState,
    IZPantexState,
    IZCampoState,
    IZFormaTablaState,
    IZComandoFormaState,
    IZVentanaState,
    IZPantex,
    ZFilaCamposState,
    IZFilaCamposState,
    IZParametrosComando,

    Constants as ZCommonConstants

} from "../zcommon";

export namespace Selectors {

    export const getZPilaPantexMap = (appState: IZAplState): Array<IZPantex> => {
        return appState.zPantexModule.pilaPantex;
    };

    export namespace ZPantexStateModule {

        export const getPilaPx = (appState: IZAplState): Array<number> => {

            if (!appState.zPantexStateModule.pilaPx) {
                return new Array<number>();
            }

            return appState.zPantexStateModule.pilaPx;
        };

        export namespace ZPantexState {

            export const getZPantexStateMap = (appState: IZAplState): EntityNormalizedObj<IZPantexState> => {

                if (!appState.zPantexStateModule.pilaPantexState) {
                    return new EntityNormalizedObj<IZPantexState>();
                }

                return appState.zPantexStateModule.pilaPantexState;
            };
        }

        export const getZParametrosComando = (appState: IZAplState): EntityNormalizedObj<IZParametrosComando> => {

            if (!appState.zPantexStateModule.zParametrosComando) {
                return new EntityNormalizedObj<IZParametrosComando>();
            }

            return appState.zPantexStateModule.zParametrosComando;
        };

        export namespace ZFormaTablaState {

            export const getZFormaTablaStateMap = (appState: IZAplState): EntityNormalizedObj<IZFormaTablaState> => {

                if (!appState.zPantexStateModule.zFormaTablaState) {
                    return new EntityNormalizedObj<IZFormaTablaState>();
                }

                return appState.zPantexStateModule.zFormaTablaState;
            };

            export const getNextZFormaTablaStateId = createSelector(
                [getZFormaTablaStateMap],
                (getZFormaTablaStateMap: EntityNormalizedObj<IZFormaTablaState>): number => {

                    if (getZFormaTablaStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZFormaTablaStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZCampoState {

            export const getZCampoStateMap = (appState: IZAplState): EntityNormalizedObj<IZCampoState> => {

                if (!appState.zPantexStateModule.zCampoState) {
                    return new EntityNormalizedObj<IZCampoState>();
                }

                return appState.zPantexStateModule.zCampoState;
            };

            export const getNextZCampoStateId = createSelector(
                [getZCampoStateMap],
                (getZCampoStateMap: EntityNormalizedObj<IZCampoState>): number => {

                    if (getZCampoStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZCampoStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZComandoFormaState {

            export const getZComandoFormaStateMap = (appState: IZAplState): EntityNormalizedObj<IZComandoFormaState> => {

                if (!appState.zPantexStateModule.zComandoFormaState) {
                    return new EntityNormalizedObj<IZComandoFormaState>();
                }

                return appState.zPantexStateModule.zComandoFormaState;
            };

            export const getNextZComandoFormaStateId = createSelector(
                [getZComandoFormaStateMap],
                (getZComandoFormaStateMap: EntityNormalizedObj<IZComandoFormaState>): number => {

                    if (getZComandoFormaStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZComandoFormaStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZVentanaState {

            export const getZVentanaStateMap = (appState: IZAplState): EntityNormalizedObj<IZVentanaState> => {

                if (!appState.zPantexStateModule.zVentanaState) {
                    return new EntityNormalizedObj<IZVentanaState>();
                }

                return appState.zPantexStateModule.zVentanaState;
            };
        }
    }

    export const getZPilaPantexState = createSelector(
        [
            ZPantexStateModule.getPilaPx,
            ZPantexStateModule.ZPantexState.getZPantexStateMap,
            ZPantexStateModule.ZFormaTablaState.getZFormaTablaStateMap,
            ZPantexStateModule.ZVentanaState.getZVentanaStateMap,
            ZPantexStateModule.ZCampoState.getZCampoStateMap,
            ZPantexStateModule.ZComandoFormaState.getZComandoFormaStateMap,
        ],
        (getPilaPx: Array<number>,
            getZPantexStateMap: EntityNormalizedObj<IZPantexState>,
            getZFormaTablaStateMap: EntityNormalizedObj<IZFormaTablaState>,
            getZVentanaStateMap: EntityNormalizedObj<IZVentanaState>,
            getZCampoStateMap: EntityNormalizedObj<IZCampoState>,
            getZComandoFormaStateMap: EntityNormalizedObj<IZComandoFormaState>): Array<IZPantexState> => {

            let pilaZPantexState = new Array<IZPantexState>();                

            /*
            if (getZPantexStateMap.allIds.length != getPilaPx.length) {
                return pilaZPantexState;
            }
            */

            //zpantex
            for (let i = 0; i < getPilaPx.length; i++) {

                let numPx = getPilaPx[i];

                const zPantex: IZPantexState = {id: numPx, zFormaTablaListState: [], ...getZPantexStateMap.byId[numPx]};

                //zft's
                for (let izft = 0; izft < getZPantexStateMap.byId[numPx].zFormaTablaStateListIds.length; izft++) {

                    let idZft = getZPantexStateMap.byId[numPx].zFormaTablaStateListIds[izft];
                    const zFormaTablaState:IZFormaTablaState = getZFormaTablaStateMap.byId[idZft];

                    zPantex.zFormaTablaListState[izft] = { ...zFormaTablaState };

                    zPantex.zFormaTablaListState[izft].zCampoStateListIds = undefined;
                    zPantex.zFormaTablaListState[izft].btnsListIds = undefined;
                    zPantex.zFormaTablaListState[izft].linEstListIds = undefined;

                    //ven
                    zPantex.zFormaTablaListState[izft].venState = getZVentanaStateMap.byId[zPantex.zFormaTablaListState[izft].idZVentana];

                    //zcampos
                    if (zFormaTablaState.zCampoStateListIds) {

                        zPantex.zFormaTablaListState[izft].cmpsState = [];
                        zPantex.zFormaTablaListState[izft].camposFijosList = [];

                        /*Es multi o zoom*/
                        if (zPantex.zFormaTablaListState[izft].venState.numLinsDatos > 0) {
                            zPantex.zFormaTablaListState[izft].filasCamposList = new Array<IZFilaCamposState>(zPantex.zFormaTablaListState[izft].venState.numLinsDatos);
                        } else {
                            zPantex.zFormaTablaListState[izft].filasCamposList = undefined;
                        }

                        let numFilaMulti = -1;
                        for (let i = 0; i < (zFormaTablaState.zCampoStateListIds.length - zFormaTablaState.camposFijosList.length); i++) {
                            let idZCampo = zFormaTablaState.zCampoStateListIds[i];

                            //Es multi o zoom, (mov con index numLinsDatos > 0)
                            if ((getZPantexStateMap.byId[numPx].tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARZOOM
                                || getZPantexStateMap.byId[numPx].tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV)
                                && zPantex.zFormaTablaListState[izft].venState.numLinsDatos > 0) {
                                if (i % (zPantex.zFormaTablaListState[izft].numCampos - zFormaTablaState.camposFijosList.length) == 0) {
                                    numFilaMulti++;
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti] = new ZFilaCamposState();
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti].cmpsState.push(getZCampoStateMap.byId[idZCampo]);
                                } else {
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti].cmpsState.push(getZCampoStateMap.byId[idZCampo]);
                                }
                                continue;
                            }

                            //es un campo hijo de un gráfico, no va en el array principal, 
                            //sino en el subarray del campo gráfico padre
                            if (getZCampoStateMap.byId[idZCampo].parentId) {
                                continue;
                            }

                            zPantex.zFormaTablaListState[izft].cmpsState.push({ ...getZCampoStateMap.byId[idZCampo] });

                            //zcampos dentro de un campo gráfico
                            let campoActual: IZCampoState = zPantex.zFormaTablaListState[izft].cmpsState[zPantex.zFormaTablaListState[izft].cmpsState.length - 1];
                            if (campoActual.esCampoGrafico) {
                                campoActual.cmpsState = [];
                                for (let k = 0; k < getZCampoStateMap.allIds.length; k++) {
                                    if (getZCampoStateMap.byId[getZCampoStateMap.allIds[k]].parentId == campoActual.id) {
                                        campoActual.cmpsState.push(getZCampoStateMap.byId[getZCampoStateMap.allIds[k]]);
                                    }
                                }
                            }
                        }

                        //Refrescar valores de campos fijos
                        for (let i = 0; i < zFormaTablaState.camposFijosList.length; i++) {
                            let idZCampo = zFormaTablaState.camposFijosList[i].id;
                            zPantex.zFormaTablaListState[izft].camposFijosList.push(getZCampoStateMap.byId[idZCampo]);
                        }                        
                    }

                    //linEst
                    if (zFormaTablaState.linEstListIds) {
                        zPantex.zFormaTablaListState[izft].linEstState = [];
                        for (let i = 0; i < zFormaTablaState.linEstListIds.length; i++) {
                            let idZComandoForma = zFormaTablaState.linEstListIds[i];
                            zPantex.zFormaTablaListState[izft].linEstState[i] = getZComandoFormaStateMap.byId[idZComandoForma];

                            if(zPantex.zFormaTablaListState[izft].linEstState[i].cmd === ZCommonConstants.ComandoEnum.CM_CERRAR){
                                zPantex.cmdCerrar = zPantex.zFormaTablaListState[izft].linEstState[i];
                            }
                        }
                    }

                    //btns
                    if (zFormaTablaState.btnsListIds) {
                        zPantex.zFormaTablaListState[izft].btnsState = [];
                        for (let i = 0; i < zFormaTablaState.btnsListIds.length; i++) {
                            let idZComandoForma = zFormaTablaState.btnsListIds[i];
                            zPantex.zFormaTablaListState[izft].btnsState[i] = getZComandoFormaStateMap.byId[idZComandoForma];
                        }
                    }
                }

                pilaZPantexState.push(zPantex);
            }

            /*
            console.log("--------------PILA PANTEX STATE - SELECTOR-------------------------");
            console.log(pilaZPantexState);
            */
            
            return pilaZPantexState;
        }
    );
}