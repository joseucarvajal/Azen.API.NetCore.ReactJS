import {

    //Models
    ZMenuModel,    

    //Utils
} from './models';

class ZMenuState
{
    zmenuModel: ZMenuModel;
}

interface ZAplicationState
{
    mostrandoVentanaModal:boolean;
}

import  {Constants} from "./constants";
import { EntityNormalizedObj, IZPantexState } from './contracts';
interface ZEventoEncolado {
    idElemento:number; //id del elemento que causa el evento encolado  (e.g. input, input-radio... etc). id global asignado en cliente.
    cmd: Constants.ComandoEnum;
    buffer: string;
}

interface ZColaEventosClienteState {
    eventosCamposEncolados: EntityNormalizedObj<IZPantexState>;
}

interface State
{    
    zmenuState:ZMenuState;
    zaplicationState:ZAplicationState;
    zColaEventosclienteState: ZColaEventosClienteState;
}

export{
    ZMenuState,
    State,
    ZAplicationState,
    ZEventoEncolado,
    ZColaEventosClienteState,
}