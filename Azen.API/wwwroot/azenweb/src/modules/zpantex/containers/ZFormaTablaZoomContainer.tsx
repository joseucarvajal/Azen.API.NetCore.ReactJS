import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZFormaTablaState, IZCampoState, IZComandoFormaState } from "../../zcommon/contracts";

import { Actions as ZAplicacionActions } from "../../zaplicacion/actions";

import {
    Actions
} from '../actions';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZFormaTablaZoom
} from '../components/ZFormaTablaZoom';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({

});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    onFilaMultiSeleccionada: (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) =>
        dispatch(Actions.ZPantexStateModule.onFilaMultiSeleccionada(zFormaTablaState, indexFilaMultiSeleccionada)),

    onCampoFocusIrACmp: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoFocusIrACmp(zcampoState)),

    despacharComando: (zcomandoFormaState: IZComandoFormaState) =>
        dispatch(ZAplicacionActions.despacharComandoLineaEstado(zcomandoFormaState)),

    seleccionarFila: (indexFila: number) =>
        dispatch(Actions.ZPantexStateModule.seleccionarFila(indexFila))
});

export const ZFormaTablaZoomContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZFormaTablaZoom);