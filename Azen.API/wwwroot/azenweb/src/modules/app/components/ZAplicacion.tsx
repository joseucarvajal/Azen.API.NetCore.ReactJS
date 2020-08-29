import * as React from "react";

import {
  ZPantexState
} from "../../zcommon";

import { ZMenuRootContainer } from "../../zmenu/containers/ZMenuRootContainer";
import { ZProcesandoContainer } from "../../zaplicacion/containers/ZProcesandoContainer";
import { ZAplicacionContainer } from "../../zaplicacion/containers/ZAplicacionContainer";

export interface OwnProps {}

export interface ConnectedState {
  pilaZPantexState: Array<ZPantexState>;
  lanzarMenu: number;
}

export interface ConnectedDispatch {}

export class ZAplicacion extends React.Component<
  OwnProps & ConnectedState & ConnectedDispatch,
  undefined
> {
  private zAplicacionDivElement: HTMLDivElement;

  constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.lanzarMenu == 1 && (
          <div>
            <ZMenuRootContainer index={0} />
          </div>
        )}

        <div>
          <ZAplicacionContainer />
        </div>

        <div>
          <ZProcesandoContainer />
        </div>
      </div>
    );
  }
}