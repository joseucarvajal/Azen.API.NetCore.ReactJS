import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZProcesando,
} from '../components/ZProcesando';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    show:appState.estaProcesandoRequestServidor,
    tipoAJAXIndicador: appState.tipoAJAXIndicador
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    
});

export const ZProcesandoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZProcesando);