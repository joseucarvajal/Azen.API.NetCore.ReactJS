import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZListadoAplicaciones,
} from '../components/ZListadoAplicaciones';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({    
    zLoginModule: appState.zLoginModule
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({

});

export const ZListadoAplicacionesContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZListadoAplicaciones);