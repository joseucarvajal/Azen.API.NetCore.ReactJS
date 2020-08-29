import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoFecha
} from '../components/ZCampoFecha';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor,
    parametrosActivacionObj: appState.parametrosActivacionObj
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    onCampoChangedEnviarCmd: (zcampoState: IZCampoState, valor: string) =>
        dispatch(Actions.ZPantexStateModule.onCampoChangedEnviarCmd(zcampoState, valor)),
});

export const ZCampoFechaContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoFecha);