import * as React from "react";

import { Panel, FormControl } from "react-bootstrap";

import {
  IZCampoState,
  IZFormaTablaState,
  IParametrosActivacionObj,
} from "../../zcommon";

declare const window: any;

export interface OwnProps {
  zCampoModel: IZCampoState;
  zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
  tkns:string

}

export interface ConnectedDispatch {
  enviarCmdCambioCmp: (zcampoState: IZCampoState, valor: string) => void;
}

export const ZCampoArchivo: React.FC<
  OwnProps & ConnectedState & ConnectedDispatch
> = (props) => {
  const {
    zCampoModel,    
    tkns,
    enviarCmdCambioCmp,
  } = props; 
  
  const [loadingFileMessage, setLoadingFileMessage] = React.useState('');

  return (
    <Panel bsStyle="success">
      <Panel.Heading>{zCampoModel.etq}</Panel.Heading>
      <Panel.Body>
        <FormControl
          type="file"
          label="Seleccionar archivo"
          onChange={async (e:any) => {
            setLoadingFileMessage('Subiendo archivo, por favor espere....');
            if(e?.target?.files?.length < 1){
              alert('Por favor seleccione un archivo');
              return;
            }            
            const formData = new FormData();
            formData.append('file', e.target.files[0]);            
            const response = await fetch('/api/transferfile', {
              headers: {                
                Authorization: `Bearer ${tkns}`,
              },
              method: "POST",      
              body: formData
            });
            
            
            if(response.status !== 201){
              setLoadingFileMessage('');
              alert('Hubo un error al cargar el archivo, por favor intentelo de nuevo');
              return;
            }
            
            const fileName = await response.text();
            setTimeout(() => {              
              setLoadingFileMessage(`Archivo "${fileName}" cargado con éxito`);
            }, 1000);
            enviarCmdCambioCmp(zCampoModel, fileName);
          }}
        />
        <span style={{color:'blue'}}>{loadingFileMessage}</span>
      </Panel.Body>
    </Panel>
  );
};
