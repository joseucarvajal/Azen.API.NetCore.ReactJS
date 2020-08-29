import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoDetallable
} from '../components/ZCampoDetallable';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    cmDetallar: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.cmDetallar(zcampoState))
});

export const ZCampoDetallableContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoDetallable);