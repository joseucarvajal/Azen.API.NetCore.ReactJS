import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState, IZCampoState } from "../../zcommon/contracts";
import { Constants as ZCommonConstants } from "../../zcommon/constants";
import { Actions as ZAplicacionActions } from "../../zaplicacion/actions";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoTextbox
} from '../components/ZCampoTextbox';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({

});

export const ZCampoTextboxContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoTextbox);