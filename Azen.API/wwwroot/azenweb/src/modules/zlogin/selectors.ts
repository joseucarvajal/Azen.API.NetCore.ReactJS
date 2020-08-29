import {
    IZAplState,
    IZLoginModule
} from "../zcommon/contracts";

export namespace Selectors {

    export const getZLoginModule = (zAplState: IZAplState): IZLoginModule => zAplState.zLoginModule;
}