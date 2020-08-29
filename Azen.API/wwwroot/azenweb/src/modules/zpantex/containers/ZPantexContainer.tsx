import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZComandoFormaState } from "../../zcommon/contracts";

import { Actions as ZAplicacionActions } from "../../zaplicacion/actions";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZPantex,
} from '../components/ZPantex';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    pxAlTope: appState.zPantexStateModule.pxAlTope,
    ultimoComandoEnviado: appState.ultimoComandoEnviado
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    despacharComandoLineaEstado:(zcomandoFormaState: IZComandoFormaState) =>
    dispatch(ZAplicacionActions.despacharComandoLineaEstado(zcomandoFormaState))
});

export const ZPantexContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZPantex);