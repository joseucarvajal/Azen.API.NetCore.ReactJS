import {
    IZComandoForma,
    CM,
} from '../zcommon';

export namespace Services {
    export class ZRecursoServices {
        
        public getCMIcon(zComando: IZComandoForma): CM.IZComandoDefinicion {

            if(CM.hashInfoComandos.has(zComando.cmd)){
                return CM.hashInfoComandos.get(zComando.cmd);
            }

            return {} as CM.IZComandoDefinicion;
        }
    }
}