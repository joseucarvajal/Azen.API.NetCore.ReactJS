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
    ZLabelCampo
} from '../components/ZLabelCampo';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    despacharComando: (zcomandoFormaState: IZComandoFormaState) =>
        dispatch(ZAplicacionActions.despacharComandoLineaEstado(zcomandoFormaState))
});

export const ZLabelCampoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZLabelCampo);