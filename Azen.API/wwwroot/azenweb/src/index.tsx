declare const process: any;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import { createStore, Action, Dispatch, Middleware, Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import "es6-string-polyfills";
require('es6-object-assign').polyfill();
require('es6-map/implement');


const { default: immutableStateInvariant } = require('redux-immutable-state-invariant');


import { combinedReducers } from './rootReducer';

import * as App from './modules/app';
import * as ZUtils from './modules/zutils';

import {
    ZMenuModel,
    ZMenuItemModel,
    CfgObj,
    IParametrosActivacionObj
} from './modules/zcommon';

import * as ZAplicacion from "./modules/zaplicacion";
import { ZAplicacionContainer } from "./modules/app/containers/ZAplicacionContainer";
import { ZListadoAplicacionesContainer } from "./modules/app/containers/ZListadoAplicacionesContainer";

import { Actions as zAplicationActions } from './modules/zaplicacion/actions'

import {

    //Utils
    EntityNormalizedObj,
    IZAplState,
    Constants

} from "./modules/zcommon";

import { Actions as ZcomunicacionesActions } from "./modules/zcomunicaciones";
import { ResultadoActionConDato } from './modules/zutils';
import {LoginPage} from './portal/pages/login/Login.page';
import HomePage from './portal/pages/home/Home.page';

console.log("Stage: " + process.env.NODE_ENV);

const middlewares = process.env.NODE_ENV != 'production' ?
    [immutableStateInvariant(), thunk] :
    [thunk];

declare let window: any;

const idApl = ZUtils.Services.getQueryStringParameter('idApl');
const nomApl = ZUtils.Services.getQueryStringParameter('nomApl');
const username = sessionStorage.getItem(Constants.AZEN_USER_SESSION_KEY);
const lanzarMenu = ZUtils.Services.getQueryStringParameter('lanzarMenu');
const nombreOpcion = ZUtils.Services.getQueryStringParameter('opcion');
const tkna = ZUtils.Services.getQueryStringParameter('tkna');

let appInitialState = {} as IZAplState;

const obtenerEstadoInicial = (cfgObj:CfgObj) => {

    appInitialState.lanzarMenu = parseInt(lanzarMenu);
    appInitialState.azenURL = cfgObj.azenBackEndURL;
    appInitialState.parametrosActivacionObj = {
        urlIframeCargarArchivo : cfgObj.urlCargarArchivo
    } as IParametrosActivacionObj;

    //Es dev    
    if (process.env.NODE_ENV != 'production') {
        appInitialState.nivelLog = 1;
        return createStore(
            App.Reducers.zaplState,
            appInitialState,
            redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
        );
    }

    appInitialState.nivelLog = 0;
    return createStore(
        App.Reducers.zaplState,
        appInitialState,
        redux.compose<undefined>(redux.applyMiddleware(...middlewares))
    );
}

ZcomunicacionesActions.cargarCfg().then(
    (cfgObj: CfgObj) => {
        cargarAplicacion(cfgObj);
    },
    (resultado: CfgObj) => {
        alert("Ha ocurrido un error, por favor verifique el archivo 'cfg.json'");
    }
);

let cargarAplicacion: (cfgObj:CfgObj) => void = (cfgObj:CfgObj) => {    

    let store = obtenerEstadoInicial(cfgObj);

    if ((idApl && nombreOpcion) || (idApl && nomApl && lanzarMenu)) {
        ReactDOM.render(
            <Provider store={store}>
                <LoginPage />
            </Provider>,
            document.getElementById("app-container")
        );

        document.title = idApl;
        store.dispatch(zAplicationActions.lanzarAplicacion(idApl, nomApl, username, lanzarMenu, nombreOpcion, tkna));
    }
    else {
        ReactDOM.render(
            <Provider store={store}>
                 <ZListadoAplicacionesContainer />
            </Provider>,
            document.getElementById("app-container")
        );
    }
}