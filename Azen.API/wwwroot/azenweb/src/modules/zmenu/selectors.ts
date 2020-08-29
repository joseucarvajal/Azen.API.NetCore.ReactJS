import {
    ZMenuModel,
    ZMenuState,
    
} from '../zcommon';


export namespace Selectors
{
    export const zmenuModelSelector = (zmenuState:ZMenuState):ZMenuModel => zmenuState.zmenuModel; 
}