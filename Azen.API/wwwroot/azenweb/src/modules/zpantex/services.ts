import {
    IZComandoForma,
    CM,
} from '../zcommon';

export namespace Services {
    export class ZRecursoServices {
        
        public getCMIcon(zComando: IZComandoForma) {

            if(CM.hashInfoComandos.has(zComando.cmd)){
                return CM.hashInfoComandos.get(zComando.cmd).icono;
            }

            return "";
        }
    }
}