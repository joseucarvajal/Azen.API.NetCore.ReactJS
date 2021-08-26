import * as React from "react";
var Modal = require("react-bootstrap-modal");

import { Panel, Row, Col, Button, Glyphicon } from "react-bootstrap";

import { Constants as ZCommonConstants } from "../../zcommon/constants";

import {
  IZPantexState,
  IZFormaTablaState,
  IZComandoFormaState
} from "../../zcommon";
import { Services as ZCommonServices } from "../../zcommon/services";
import { ZLineaEstadoContainer } from "../containers/ZLineaEstadoContainer";
import { ZBarraComandosContainer } from "../containers/ZBarraComandosContainer";
import { ZFormaTablaContainer } from "../containers/ZFormaTablaContainer";

export interface OwnProps {
  zPantex: IZPantexState;
  container: HTMLDivElement;
}

export interface ConnectedState {
  pxAlTope: number;
  ultimoComandoEnviado: ZCommonConstants.ComandoEnum;
}

export interface ConnectedDispatch {
  despacharComandoLineaEstado: (
    zcomandoFormaState: IZComandoFormaState
  ) => void;
}

export class ZPantex extends React.PureComponent<
  OwnProps & ConnectedState & ConnectedDispatch,
  undefined
> {
  private commonServices: ZCommonServices.ZCommonServices;

  constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
    super(props);

    this.commonServices = new ZCommonServices.ZCommonServices();
  }

  private cerrarPantex = () => {
    this.props.despacharComandoLineaEstado(this.props.zPantex.cmdCerrar);
  };


  render(): any {
    const tituloHTML = (
      <h3>{this.props.zPantex.zFormaTablaListState[0].venState.descr}</h3>
    );

    let titulo: any = tituloHTML;

    return (
      <div>
        <Modal
          onHide={this.cerrarPantex}
          show={true}
          backdrop="static"
          aria-labelledby="contained-modal-title-sm"
          container={this.props.container}
        >
          <Modal.Body            
            style={{
              padding: "0px"
            }}
          >
            {this.props.zPantex.zFormaTablaListState.map(
              (zFormaTablaI: IZFormaTablaState, zftIndex: number) => {
                if (
                  this.props.zPantex.tipoCmdPantex ==
                    ZCommonConstants.ComandoEnum.CM_PXCREARMOV &&
                  zFormaTablaI.venState.numLinsDatos > 1
                ) {
                  titulo = undefined;
                } else {
                  titulo = tituloHTML;
                }

                return (
                  <div key={zFormaTablaI.id}>
                    <Panel
                      bsStyle="success"
                      style={{
                        marginBottom: "0px"
                      }}
                    >
                      <Panel.Heading>
                        {zftIndex == 0 && (
                          <div
                            style={{
                              display: "inline-block",
                              minWidth: "100%"
                            }}
                          >
                            <div style={{ float: "left" }}>{titulo}</div>
                            <div style={{ float: "right", paddingTop: "6px" }}>
                              {this.props.zPantex.cmdCerrar && (
                                <Button
                                  bsStyle="success"
                                  onClick={this.cerrarPantex}
                                  title="Cerrar"
                                >
                                  <Glyphicon glyph="remove" />
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </Panel.Heading>
                      <Panel.Body>
                        {zftIndex == 0 && ( //linea estado encabezado
                          <ZLineaEstadoContainer
                            linEst={zFormaTablaI.linEstState}
                            zFormaTablaState={zFormaTablaI}
                            tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                          />
                        )}

                        {zftIndex == 1 && ( //linea estado detalle
                          <Row>
                            <Col
                              xs={12}
                              sm={6}
                              md={6}
                              lg={4}
                              smOffset={6}
                              mdOffset={6}
                              lgOffset={8}
                            >
                              <ZLineaEstadoContainer
                                linEst={zFormaTablaI.linEstState}
                                zFormaTablaState={zFormaTablaI}
                                tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                              />
                            </Col>
                          </Row>
                        )}

                        {zFormaTablaI.cmpsState &&
                        zFormaTablaI.cmpsState.length > 6 && ( //Parte superior
                            <div>
                              <ZBarraComandosContainer
                                zComandosList={zFormaTablaI.btnsState}
                              />
                            </div>
                          )}

                        <ZFormaTablaContainer
                          zPantex={this.props.zPantex}
                          zFormaTabla={zFormaTablaI}
                          zftIndex={zftIndex}
                        />

                        {(this.props.zPantex.zFormaTablaListState.length == 1 ||
                          zftIndex != 0) && ( //Parte inferior
                          <div style={{ marginTop: "5px" }}>
                            <ZBarraComandosContainer
                              zComandosList={
                                this.props.zPantex.zFormaTablaListState
                                  .length == 1
                                  ? zFormaTablaI.btnsState
                                  : this.props.zPantex.zFormaTablaListState[0]
                                      .btnsState
                              }
                            />
                          </div>
                        )}
                      </Panel.Body>
                    </Panel>
                  </div>
                );
              }
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
