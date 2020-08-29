import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZAplicacion as ZAplicacionComp,
} from '../components/ZAplicacion';

import {
    Selectors as ZPantexSelectors
} from '../../zpantex/selectors';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    pilaZPantexState: ZPantexSelectors.getZPilaPantexState(appState),
    lanzarMenu:appState.lanzarMenu
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({

});

export const ZAplicacionContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionComp);