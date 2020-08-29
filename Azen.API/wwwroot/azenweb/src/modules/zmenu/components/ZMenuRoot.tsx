import * as React from 'react';

import {
    Glyphicon,
    Navbar,
    Nav,
     NavItem
 } from 'react-bootstrap';

import * as ZCommon from '../../zcommon';

import {
    ZMenuItemModel,
    IZMenu,
    IZMenuItem,
    IParametrosActivacionObj
} from '../../zcommon';

export interface OwnProps {
    index: number;
}

export interface ConnectedState {
    zMenu: IZMenu;
    idApl: string;
    username: string;

    parametrosActivacionObj: IParametrosActivacionObj;

    ponerModal: boolean;
    estaProcesandoRequestServidor: boolean;
    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum
}

export interface ConnectedDispatch {
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;

    activarLogConsola: (nivelLog: number) => void;
}

import { ZMenuItemContainer } from '../containers/ZMenuItemContainer';

export class ZMenuRoot extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
        this.activarLogConsola = this.activarLogConsola.bind(this);
    }

    render() {

        let { zMenu, idApl } = this.props;

        return (
            <Navbar
                collapseOnSelect
                staticTop
                style={this.props.ponerModal ||
                    (this.props.tipoAJAXIndicador == ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL && this.props.estaProcesandoRequestServidor)
                    ? null
                    : { zIndex: 1000000 }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="javascript:void(0);">{idApl}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle></Navbar.Toggle>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {zMenu.menu.map((zMenuItem: IZMenuItem, i: number) => {
                            let key: string = zMenuItem.ctx;
                            return (
                                <ZMenuItemContainer
                                    key={key}
                                    zmenuItem={zMenuItem}
                                    despacharOpcionMenuFn={this.despacharOpcionMenu}
                                    parentLevel={0} />
                            );
                        })}
                    </Nav>
                    {this.props.parametrosActivacionObj.bd && (
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="user" /> {this.props.parametrosActivacionObj.usuario}, {this.props.parametrosActivacionObj.uid}
                            </NavItem>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="calendar" /> {this.props.parametrosActivacionObj.mes}, {this.props.parametrosActivacionObj.anio}
                            </NavItem>
                            <NavItem eventKey={1} href="#" onDoubleClick={this.activarLogConsola}>
                                <Glyphicon glyph="tasks" /> 
                                <span 
                                    title={this.props.parametrosActivacionObj.bd}
                                    style={{
                                        marginLeft:"3px"
                                    }}
                                > 
                                    {this.props.parametrosActivacionObj.bd.length > 4 ? this.props.parametrosActivacionObj.bd.substring(0, 5) + "..." : this.props.parametrosActivacionObj.bd}
                                </span>
                            </NavItem>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    despacharOpcionMenu(zmenuItemModel: ZMenuItemModel) {
        this.props.despacharOpcionMenu(zmenuItemModel);
    }

    activarLogConsola(e: any) {
        this.props.activarLogConsola(1);
    }
}