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
import { EntityMap, EntityNormalizedObj, IZPantexState } from './contracts';
interface ZEventoEncolado {
    pxElemento: number;
    idElemento:number; //id del elemento que causa el evento encolado  (e.g. input, input-radio... etc). id global asignado en cliente.
    cmd: Constants.ComandoEnum;
    buffer: string;
}

interface ZColaEventosClienteState {
    eventosCamposEncolados: EntityMap<ZEventoEncolado>;
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