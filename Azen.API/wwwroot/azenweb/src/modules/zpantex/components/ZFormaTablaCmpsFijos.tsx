import * as React from "react";

import { Col, Form, Panel } from "react-bootstrap";

import { Constants as ZCommonConstants } from "../../zcommon/constants";

import { IZFormaTablaState, IZCampoState } from "../../zcommon";
import ZCampo from "./ZCampo";

export interface OwnProps {
  zFormaTabla: IZFormaTablaState;
  tipoCmdPantex: ZCommonConstants.ComandoEnum;
}

export interface ConnectedDispatch {}

export interface ConnectedState {}

export class ZFormaTablaCmpsFijos extends React.PureComponent<
  OwnProps & ConnectedDispatch,
  ConnectedState
> {
  constructor(props: OwnProps & ConnectedDispatch) {
    super(props);
  }

  render(): any {
    return (
      <Panel bsStyle="success">
        <Panel.Body>
          <Form horizontal>
            {this.props.zFormaTabla.camposFijosList.map(
              (zcampoAPintar: IZCampoState, index: number) => {
                return (
                  <Col key={index} md={4}>
                    <ZCampo
                      zFormaTabla={this.props.zFormaTabla}
                      tipoCmdPantex={this.props.tipoCmdPantex}
                      zCampo={zcampoAPintar}
                    />
                  </Col>
                );
              }
            )}
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}
