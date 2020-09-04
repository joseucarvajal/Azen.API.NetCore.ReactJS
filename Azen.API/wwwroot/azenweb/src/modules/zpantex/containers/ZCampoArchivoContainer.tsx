import * as React from 'react';
import { connect } from 'react-redux';

import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState, IZCampoState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoArchivo
} from '../components/ZCampoArchivo';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    azenAPIURL: appState.azenURL,
    tkns: appState.zLoginModule.tkns
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, void, Action>): ConnectedDispatch => ({
    enviarCmdCambioCmp: (zcampoState: IZCampoState, valor: string) =>
        dispatch(Actions.ZPantexStateModule.enviarCmdCambioCmp(zcampoState, valor)),
});

export const ZCampoArchivoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoArchivo);