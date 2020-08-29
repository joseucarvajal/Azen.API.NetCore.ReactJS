import * as React from "react";

import { Panel } from "react-bootstrap";

import {
  IZCampoState,
  IZFormaTablaState,
  IParametrosActivacionObj
} from "../../zcommon";

declare const window: any;

export interface OwnProps {
  zCampoModel: IZCampoState;
  zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
  parametrosActivacionObj: IParametrosActivacionObj;
}

export interface ConnectedDispatch {
  enviarCmdCambioCmp: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoArchivo extends React.PureComponent<
  OwnProps & ConnectedState & ConnectedDispatch,
  undefined
> {
  constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
    super(props);
    this.escucharMensajeArchivoCargado();
  }

  render() {
    const { zCampoModel, zFormaTabla } = this.props;

    let iframeURL = `${this.props.parametrosActivacionObj.urlIframeCargarArchivo}?rutaArchivo=${zCampoModel.value}`;

    return (
      <Panel bsStyle="success">
        <Panel.Heading>{zCampoModel.etq}</Panel.Heading>
        <Panel.Body>
          <iframe
            src={iframeURL}
            style={{ border: 0, maxHeight: "65px", width: "100%" }}
          ></iframe>
        </Panel.Body>
      </Panel>
    );
  }

  escucharMensajeArchivoCargado() {
    let eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    let eventer = window[eventMethod];
    let messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";
    eventer(messageEvent, (e: any) => {
      try {
        if (
          e.origin !== this.props.parametrosActivacionObj.urlIframeCargarArchivo
        ) {
          this.props.enviarCmdCambioCmp(
            this.props.zCampoModel,
            e.data.nombreArchivo
          );
        }
      } catch (e) {
        console.error("error recibiendo evento servidor cargar archivos");
        console.error(e);
      }
    });
  }

  shouldComponentUpdate(nextProps: OwnProps, nextState: ConnectedState) {
    return false;
  }
}
