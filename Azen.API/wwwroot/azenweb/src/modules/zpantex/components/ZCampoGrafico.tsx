import * as React from "react";

import { Col, Panel } from "react-bootstrap";

import {
  IZCampoState,
  IZFormaTablaState,
  Constants as ZCommonConstants
} from "../../zcommon";

import ZCampo from "./ZCampo";

interface OwnProperties {
  zFormaTabla: IZFormaTablaState;
  tipoCmdPantex: ZCommonConstants.ComandoEnum;
  zCampoGrafico: IZCampoState;
}

export default class ZCampoGrafico extends React.PureComponent<
  OwnProperties,
  undefined
> {
  public static defaultProps: Partial<OwnProperties> = {};

  render() {
    const { zFormaTabla, zCampoGrafico } = this.props;

    if (zCampoGrafico.etq == "@Rjuntura") {
      if (zCampoGrafico.cmpsState.length == 2) {
        return (
          <Panel bsStyle="success">
            <Panel.Body>
              {zCampoGrafico.cmpsState &&
                zCampoGrafico.cmpsState.map(
                  (zCampoI: IZCampoState, index: number) => {
                    if (index == 0) {
                      return (
                        <Col key={zCampoI.id} xs={12} sm={4} md={4}>
                          <ZCampo
                            zCampo={zCampoI}
                            zFormaTabla={zFormaTabla}
                            tipoCmdPantex={this.props.tipoCmdPantex}
                          />
                        </Col>
                      );
                    }
                    return (
                      <Col key={zCampoI.id} xs={12} sm={4} md={8}>
                        <ZCampo
                          zCampo={zCampoI}
                          zFormaTabla={zFormaTabla}
                          tipoCmdPantex={this.props.tipoCmdPantex}
                        />
                      </Col>
                    );
                  }
                )}
            </Panel.Body>
          </Panel>
        );
      }

      return (
        <Panel bsStyle="success">
          <Panel.Body>
            {zCampoGrafico.cmpsState &&
              zCampoGrafico.cmpsState.map(
                (zCampoI: IZCampoState, index: number) => {
                  return (
                    <Col
                      key={zCampoI.id}
                      xs={12}
                      sm={4}
                      md={12 / zCampoGrafico.cmpsState.length}
                    >
                      <ZCampo
                        zCampo={zCampoI}
                        zFormaTabla={zFormaTabla}
                        tipoCmdPantex={this.props.tipoCmdPantex}
                      />
                    </Col>
                  );
                }
              )}
          </Panel.Body>
        </Panel>
      );
    }

    return (
      <Panel bsStyle="success">
        <Panel.Heading>{zCampoGrafico.etq.replace("@R", "")}</Panel.Heading>
        <Panel.Body>
          {zCampoGrafico.cmpsState &&
            zCampoGrafico.cmpsState.map(
              (zCampoI: IZCampoState, index: number) => {
                return (
                  <Col
                    key={zCampoI.id}
                    xs={12}
                    sm={4}
                    md={12 / zCampoGrafico.cmpsState.length}
                  >
                    <ZCampo
                      zCampo={zCampoI}
                      zFormaTabla={zFormaTabla}
                      tipoCmdPantex={this.props.tipoCmdPantex}
                    />
                  </Col>
                );
              }
            )}
        </Panel.Body>
      </Panel>
    );
  }
}
