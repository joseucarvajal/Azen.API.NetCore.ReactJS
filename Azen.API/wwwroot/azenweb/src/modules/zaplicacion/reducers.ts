import {
    //state
    ZAplicationState,
} from '../zcommon';

import * as ZMenu from '../zmenu';

export namespace Reducers {

    export const zaplicacionReducer = (state: ZAplicationState = {} as ZAplicationState, action: any): ZAplicationState => {

        switch (action.type) {
            case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:                
                return {
                    ...state,
                    mostrandoVentanaModal: false                    
                };
        }

        return state;
    }
}

