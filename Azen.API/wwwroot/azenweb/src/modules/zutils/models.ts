import {
    Constants
} from './constants';

export class ResultadoAction {
    resultado: Constants.ResultadoAccionEnum;
    mensaje: string;
    traza: string;
}

export class ResultadoActionConDato<TipoRetorno> extends ResultadoAction {
    retorno: TipoRetorno;
}