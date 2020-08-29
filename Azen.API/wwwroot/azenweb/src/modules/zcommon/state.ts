import {

    //Models
    ZMenuModel,    

    //Utils
} from './models';

class ZMenuState
{
    zmenuModel: ZMenuModel;
}

interface State
{    
    zmenuState:ZMenuState;
    zaplicationState:ZAplicationState;
}

interface ZAplicationState
{
    mostrandoVentanaModal:boolean;
}

export{
    ZMenuState,
    State,
    ZAplicationState
}