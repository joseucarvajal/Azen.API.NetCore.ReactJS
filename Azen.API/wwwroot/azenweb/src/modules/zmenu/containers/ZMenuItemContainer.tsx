import * as React from 'react';
import { connect } from 'react-redux';

import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";


import { IZAplState } from "../../zcommon/contracts";


import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZMenuItem,
} from '../components/ZMenuItem';

import * as ZAplicacion from '../../zaplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, string, AnyAction>): ConnectedDispatch => ({
    lanzarOpcion: (ctx: string) => dispatch(ZAplicacion.Actions.lanzarOpcion(ctx))
});

export const ZMenuItemContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZMenuItem);