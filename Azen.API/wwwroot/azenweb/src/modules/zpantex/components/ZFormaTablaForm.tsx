import * as React from 'react';
import {
    Col,
    Form,
} from 'react-bootstrap';

import { IZFormaTablaState, IZCampoState, IZPantexState } from "../../zcommon";
import ZCampo from "./ZCampo";

export interface OwnProps {
    zPantex: IZPantexState;
    zFormaTabla: IZFormaTablaState;
    zftIndex: number;
}

export interface ConnectedDispatch {

}

export interface ConnectedState {
}


export class ZFormaTablaForm extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{
    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);
    }

    render(): any {

        return (
            <Form
                horizontal
            >
                {this.props.zFormaTabla.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                    return (
                        <Col
                            md={this.props.zFormaTabla.venState.factorDivision ? this.props.zFormaTabla.venState.factorDivision : 4}
                            key={zcampoAPintar.id}
                        >
                            <ZCampo
                                zFormaTabla={this.props.zFormaTabla}
                                tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                                zCampo={zcampoAPintar}
                            />
                        </Col>
                    );
                })}
            </Form>
        );
    }
}