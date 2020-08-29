import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    Selectors as ZPantexSelectors
} from '../../zpantex/selectors';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZAplicacion,
} from '../components/ZAplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    //estaProcesandoServidor: appState.estaProcesandoRequestServidor,    
    pilaZPantexState: ZPantexSelectors.getZPilaPantexState(appState)    
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    
});

export const ZAplicacionContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacion);