import {Aplicacion} from './Aplicacion';

export interface GruposAplicaciones{
    area: string,
    aplicaciones: Aplicacion[] | undefined;
}