import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import {OpcionSoporte} from '../../models/opciones-soporte/OpcionSoporte';

export const useOpcionesSoporte = () => {

    const azenApi = useAzenApi();

    return useQuery<OpcionSoporte[]>(['soporte'], async () => {
        const { data } = await azenApi.get(`soporte`);
        
        return data;
    }, {
        retry: 1,
    });
};