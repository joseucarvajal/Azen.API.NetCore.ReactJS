import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import { DatosIniciales } from '../../models/datos-iniciales/datos-iniciales';

export const useDatosIniciales = () => {

    const azenApi = useAzenApi();

    return useQuery<DatosIniciales>('datosIniciales', async () => {
        const { data } = await azenApi.get(`datosIniciales`);
        return data;
    }, {
        retry: 1,
    });
};
