import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoRadio
} from '../components/ZCampoRadio';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    prenderValorBitRadio: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.prenderValorBitRadio(zcampoState)),
});

export const ZCampoRadioContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoRadio);