import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoCheckbox
} from '../components/ZCampoCheckbox';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    notificarCambioCheckbox: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.notificarCambioCheckbox(zcampoState))
});

export const ZCampoCheckboxContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoCheckbox);