const u = require('updeep');

import {
    IZMenuModule,
} from '../zcommon/contracts';

import {
    ActionTypes
} from './actionTypes';

export namespace Reducers {

    export namespace ZMenuModule {

        const zMenuModule = {
            visible: true,
            zmenu:{
                menu:[]
            }
        } as IZMenuModule;

        export const impl = (state: IZMenuModule = zMenuModule, action: ActionTypes.ZMenuModule.Action) => {

            switch (action.type) {
                case ActionTypes.ZMenuModule.SET_ZMENU:
                    return u({
                        zmenu:action.zmenu
                    } as IZMenuModule, state);

                case ActionTypes.ZMenuModule.SET_VISIBLE:
                    return u({
                        visible:action.visible
                    } as IZMenuModule, state);                    
            }

            return state;
        }
    }
}