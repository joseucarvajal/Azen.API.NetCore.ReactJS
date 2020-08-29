import {
    ZMenuItemModel
} from '../zcommon';

import { IZMenu } from "../zcommon/contracts";

export namespace ActionTypes {    

    export namespace ZMenuModule {

        export namespace Types {
            export type SET_ZMENU = "IZMenuModule/SET_ZMENU";
            export type SET_VISIBLE = "IZMenuModule/SET_VISIBLE";
        }

        export const SET_ZMENU: Types.SET_ZMENU = "IZMenuModule/SET_ZMENU";
        export const SET_VISIBLE: Types.SET_VISIBLE = "IZMenuModule/SET_VISIBLE";

        export type Action =
            { type: Types.SET_ZMENU, zmenu: IZMenu } |
            { type: Types.SET_VISIBLE, visible: boolean }
    }
    
    export namespace Types {
        export type CARGAR_MENU = "zmenu/CARGAR_MENU";
        export type DESPACHAR_OPCION_MENU = "zmenu/DESPACHAR_OPCION_MENU";
    }

    export const CARGAR_MENU: Types.CARGAR_MENU = "zmenu/CARGAR_MENU";
    export const DESPACHAR_OPCION_MENU: Types.DESPACHAR_OPCION_MENU = "zmenu/DESPACHAR_OPCION_MENU";

    //Action parameters
    export type Action =
        //UI  actions
        { type: Types.CARGAR_MENU, appName: string } |
        { type: Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel }
}