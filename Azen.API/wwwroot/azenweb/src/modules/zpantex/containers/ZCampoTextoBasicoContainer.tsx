import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoTextoBasico
} from '../components/ZCampoTextoBasico';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor: appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    onCampoFocusIrACmp: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoFocusIrACmp(zcampoState)),

    onCampoBlur: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoBlur(zcampoState)),

    onCampoChanged: (zcampoState: IZCampoState, valor: string) =>
        dispatch(Actions.ZPantexStateModule.onCampoChanged(zcampoState, valor)),
});

export const ZCampoTextoBasicoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoTextoBasico);