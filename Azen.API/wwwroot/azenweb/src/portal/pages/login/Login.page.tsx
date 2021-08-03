import * as React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Glyphicon,
  Grid,
  Row,
} from "react-bootstrap";
import "./login.page.css";

import * as ZUtils from "../../../modules/zutils";
import { IZLoginModule } from "../../../modules/zcommon/contracts";

export interface OwnProps {}

export interface ConnectedState {
  zLoginModule: IZLoginModule;
}

export interface ConnectedDispatch {
  despacharLogin: (idApl?: string, nombreOpcion?: string) => void;
  usernameChanged: (username: string) => void;
  passwordChanged: (password: string) => void;
}

export const LoginPage: React.FunctionComponent <OwnProps & ConnectedState & ConnectedDispatch> = (props) => {
  

  const onIngresarClick = () => {
    const idApl = ZUtils.Services.getQueryStringParameter("idApl");
    const nombreOpcion = ZUtils.Services.getQueryStringParameter("opcion");
    props.despacharLogin(idApl, nombreOpcion);
  };

  const onUsernameChanged = (e: any) => {
    props.usernameChanged(e.target.value);
  };

  const onPasswordChanged = (e: any) => {
    props.passwordChanged(e.target.value);
  };

  return (
    <>
      <Grid className="mt-5">
        <Row className="mt-5 ml-5 mr-5">
          <Col lg={5} md={6} sm={12} className="bienvenido text-success">
            <h1 className="shadow-sm text-success mt-8 p-3 text-center rounded titulo-bienvenido">
              Bienvenid@
            </h1>
            <img
              className="mt-5"
              src="https://github.com/marcelaTrujilloToro/loteriApp.ionic.react/blob/main/public/assets/img/splash/LoteriApp_azen_96x30.png?raw=true"
              alt=""
            />
          </Col>

          <Col
            lg={7}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg text-center container-login"
          >
            <h2 className="shadow-sm text-success mt-30 p-3 text-center rounded ">
              Ingreso
            </h2>

            <img
              className="mt-5"
              src="https://img.icons8.com/cute-clipart/64/26e07f/password.png"
              alt="icon"
            />

            <Form className="m-30">
              <FormGroup controlId="formBasicEmail">
                <h4>Usuario:</h4>
                <FormControl
                  type="username"
                  placeholder="Nombre usuario"
                  value={props.zLoginModule.username}
                  onChange={onUsernameChanged}
                />
              </FormGroup>

              <FormGroup controlId="formBasicPassword">
                <h4>Contraseña:</h4>
                <FormControl
                  type="password"
                  placeholder="Contraseña"
                  value={props.zLoginModule.password}
                  onChange={onPasswordChanged}
                />
              </FormGroup>

              <Button
                bsStyle="success btn-block mt-5 mb-5 btn-signin"
                bsSize="large"
                type="button"
                onClick={onIngresarClick}
              >
                Ingresar
              </Button>
            </Form>
          </Col>
        </Row>
      </Grid>
    </>
  );
};
