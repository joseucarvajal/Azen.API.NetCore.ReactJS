import * as React from 'react';

import { connect } from 'react-redux';
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { IZAplState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZLogin
} from '../components/ZLogin';

import { Actions } from '../actions'
import { LoginPage } from '../../../portal/pages/login/Login.page';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({    
    zLoginModule: appState.zLoginModule
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IZAplState, {}, AnyAction>): ConnectedDispatch => ({
    despacharLogin: (idApl?:string, nombreOpcion?:string) =>
        dispatch(Actions.ZLoginModule.login(idApl, nombreOpcion)),

    usernameChanged: (username: string) =>
        dispatch(Actions.ZLoginModule.setUsername(username)),

    passwordChanged: (password: string) =>
        dispatch(Actions.ZLoginModule.setPassword(password))
});

export const ZLoginContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(LoginPage);