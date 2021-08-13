import { FunctionComponent, useState } from "react";
import React = require("react");
import { Button } from "react-bootstrap";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { CM, IZComandoFormaState } from "../../zcommon/contracts";

import { Services } from "../services";

type ZButtonComandoProps = {
    zComando: IZComandoFormaState;
    despacharComandoLineaEstado: (comando: IZComandoFormaState) => void;
    esRegionActiva?: boolean;
    esLineaEstadoButton?: boolean
}

export const ZButtonComando: FunctionComponent<ZButtonComandoProps> = ({
    zComando,
    despacharComandoLineaEstado,
    esRegionActiva,
    esLineaEstadoButton,
}) => {

    let zPantexServices = new Services.ZRecursoServices();
    let zComandoInfo = zPantexServices.getCMIcon(zComando);
    useHotkeys(zComandoInfo.hotKey ?? '', (event: any) => {
        if (zComando.desh != 1 && zComandoInfo.hotKey) {
            despacharComandoLineaEstado(zComando);
        }
    }, {
    });

    return (
        <Button
            bsStyle={esRegionActiva && esLineaEstadoButton  ? "success" : "default"}
            title={`${zComando.etq} - ${zComandoInfo?.hotKeyTitle}`}
            disabled={zComando.desh == 1}
            onClick={() => despacharComandoLineaEstado(zComando)}
        >
            {(!zComandoInfo.icono) &&
                zComando.etq
            }
            <span className={zComandoInfo.icono} aria-hidden="true"></span>
        </Button>
    );
};