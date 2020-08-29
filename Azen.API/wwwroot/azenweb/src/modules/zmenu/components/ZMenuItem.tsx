import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    MenuItem,
    NavDropdown,
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { ZMenuItemContainer } from "../containers/ZMenuItemContainer";

export interface OwnProps {
    zmenuItem: IZMenuItem
    parentLevel: number;
    menuItemPadre?: IZMenu,
    despacharOpcionMenuFn?: (zmenuItemModel: IZMenuItem) => void
}

export interface ConnectedState {
    
}

export interface ConnectedDispatch
{
    lanzarOpcion: (ctx: string) => void;
}

interface OwnState {
    isMenuOpen: boolean;
}

export class ZMenuItem extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, OwnState>
{
    private opcionesHijasDePrimerNivel: Array<any> = [];

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {

        super(props);

        this.state = {
            isMenuOpen: false
        } as OwnState;

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
        this.createSubMenu = this.createSubMenu.bind(this);
    }

    render(): any {

        let {
            zmenuItem,
            menuItemPadre,
            parentLevel
        } = this.props;

        let { isMenuOpen } = this.state;

        let menuStyle = {
            marginLeft: (parentLevel * 10) + "px"
        } as CSSProperties;

        let opcionMenu = <MenuItem
            href="#"
            style={menuStyle}            
            onSelect={this.despacharOpcionMenu}>
            {zmenuItem.nom}
        </MenuItem>;

        if (this.esMenuContenedor()) {
            this.loadOpcionesHijasDePrimerNivel();
            opcionMenu =
                (
                    <NavDropdown
                        onClick={this.createSubMenu}
                        style={menuStyle}
                        eventKey={2}
                        title={zmenuItem.nom}                        
                        id={"z_menuitem_" + zmenuItem.ctx}>
                        {this.opcionesHijasDePrimerNivel}
                    </NavDropdown>
                );
        }

        return (opcionMenu);
    }


    loadOpcionesHijasDePrimerNivel() {

        if (!this.state.isMenuOpen) {
            return;
        }

        let {
            zmenuItem,
            menuItemPadre,
            parentLevel
        } = this.props;

        this.opcionesHijasDePrimerNivel = (
            zmenuItem.menu.map((zmenuItemModelChild: IZMenuItem, index: number) => {
                let key: string = zmenuItemModelChild.ctx;
                return (
                    <ZMenuItemContainer
                        key={key}
                        zmenuItem={zmenuItemModelChild}
                        parentLevel={parentLevel + 1}
                        despacharOpcionMenuFn={this.props.despacharOpcionMenuFn}                    
                    />
                );
            })
        );
    }

    esMenuContenedor() {
        let { zmenuItem } = this.props;
        return zmenuItem.menu && zmenuItem.menu.length > 0;
    }

    createSubMenu() {
        this.setState({
            isMenuOpen: true
        } as OwnState);
    }

    despacharOpcionMenu() {
        document.body.click();// .getElementById("azen-evt-container").click();
        this.props.lanzarOpcion(this.props.zmenuItem.ctx);
    }
}
