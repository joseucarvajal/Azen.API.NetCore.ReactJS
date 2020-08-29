import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    Actions as ZComunicacionesActions
} from '../../zcomunicaciones';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZTemplate,
} from '../components/ZTemplate';

import * as ZAplicacion from '../../zaplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    show:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    
});

export const ZTemplateContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZTemplate);