import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../../modules/zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZListadoAplicaciones,
} from '../../../modules/app/components/ZListadoAplicaciones';
import Portal from './Portal';


const mapStateToProps = (appState: IZAplState): ConnectedState => ({    
    zLoginModule: appState.zLoginModule
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({

});

export const PortalContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(Portal);