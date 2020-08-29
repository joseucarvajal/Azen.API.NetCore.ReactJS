import { combineReducers, Reducer } from 'redux';

import * as ZAplicacion from './modules/zaplicacion/';

import {
    State
} from './modules/zcommon';

export const combinedReducers: Reducer<State> = combineReducers<State>({

    //la llave de la propiedad debe estar en el State general de la aplicación. Ej:
    //State = { zaplicationState : {} }
    //zmenuState:ZMenu.Reducers.zmenuReducer,
    zaplicationState: ZAplicacion.Reducers.zaplicacionReducer    
});