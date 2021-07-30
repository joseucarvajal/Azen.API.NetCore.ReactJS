import {Aplicacion} from './Aplicacion';

export interface GrupoAplicaciones{
    area: string,
    aplicaciones: Aplicacion[] | undefined;
}