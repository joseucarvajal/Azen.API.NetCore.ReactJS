import { FunctionComponent, useState } from "react";
import React = require("react");
import { Button } from "react-bootstrap";
import { useHotkeys } from "react-hotkeys-hook";
import { CM, IZComandoFormaState } from "../../zcommon/contracts";

import { Services } from "../services";

type ZButtonComandoProps = {
    key: string,
    zComando: IZComandoFormaState;
    despacharComandoLineaEstado: (comando: IZComandoFormaState)=>void;
    zPantexServices: Services.ZRecursoServices;
    esRegionActiva?: boolean;
    zComandoInfo: CM.IZComandoDefinicion;
  }

export const ZButtonComando: FunctionComponent<ZButtonComandoProps> = ({
    zComando, 
    despacharComandoLineaEstado,
    zPantexServices,
    esRegionActiva,
    zComandoInfo,
    key,}) => {
    console.log(`${zComando.etq} - ${zComandoInfo.hotKey} - ${zComando.cmd}`);
    useHotkeys(zComandoInfo.hotKey, (event:any)=>{
        console.log('hot key');
        if(event.target === "input"){
            alert('you pressed a!')
        }
        if(zComando.desh != 1 && zComandoInfo.hotKey){
            despacharComandoLineaEstado(zComando);
        }
    }, {
        enableOnTags:['INPUT']
    });
      
    return (
        <Button
        key={zComando.id}
        bsStyle={esRegionActiva ? "info" : "default"}
        title={`${zComando.etq} - ${zComandoInfo?.hotKeyTitle} - ${zComando.cmd}`}
        disabled={zComando.desh == 1}
        onClick={() => despacharComandoLineaEstado(zComando)}
    >
        {(!zComandoInfo) &&
            zComando.etq
        }                                    
        <span className={zComandoInfo.icono} aria-hidden="true"></span>
    </Button>
    );
  };