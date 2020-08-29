import * as React from 'react';

import { 
    ZPantexState, 
    IZPantexState 
} from "../../zcommon";

import { ZPantexContainer } from "../../zpantex/containers/ZPantexContainer";

export interface OwnProps {

}

export interface ConnectedState {
    pilaZPantexState: Array<ZPantexState>;
}

export interface ConnectedDispatch {

}

export class ZAplicacion extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private zAplicacionDivElement: HTMLDivElement;

    render(): any {        
        return (
            <div ref={(div: HTMLDivElement) => { this.zAplicacionDivElement = div; }}>
                {this.props.pilaZPantexState.map((zPantexI: IZPantexState, index: number) => {
                    return (
                        <ZPantexContainer
                            key={index}
                            zPantex={zPantexI}
                            container={this.zAplicacionDivElement}                            
                        />
                    );
                })}
            </div>
        );
    }

    componentDidUpdate(){        
        if(this.props.pilaZPantexState.length > 0 
            && this.props.pilaZPantexState[this.props.pilaZPantexState.length - 1].esModal){        
            let ventanas:HTMLCollectionOf<any> = document.getElementsByClassName("modal-dialog");
            ventanas[this.props.pilaZPantexState.length - 1].style.top = "0px";
        }
    }
}
