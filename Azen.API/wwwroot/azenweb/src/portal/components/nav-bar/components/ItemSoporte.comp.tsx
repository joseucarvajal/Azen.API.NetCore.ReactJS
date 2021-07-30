import React from 'react';
import { MenuItem } from 'react-bootstrap';
import { OpcionSoporte } from '../../../models/opciones-soporte/OpcionSoporte';

type SoporteProps = {
    opcionSoporte: OpcionSoporte;
}

export const ItemSoporte: React.FC<SoporteProps> = (props) => {
    return (
        <MenuItem>{props.opcionSoporte.opc}</MenuItem>
    )
}
