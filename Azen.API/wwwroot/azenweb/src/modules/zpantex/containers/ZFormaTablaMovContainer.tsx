import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZFormaTablaState } from "../../zcommon/contracts";

import {
    Actions
} from '../actions';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZFormaTablaMov
} from '../components/ZFormaTablaMov';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    onFilaMultiSeleccionada: (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) =>
        dispatch(Actions.ZPantexStateModule.onFilaMultiSeleccionada(zFormaTablaState, indexFilaMultiSeleccionada))
});

export const ZFormaTablaMovContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZFormaTablaMov);