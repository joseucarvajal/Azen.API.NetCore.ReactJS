import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import {OpcionPreferido} from '../../models/opciones-preferidas/OpcionPreferido';



export const useOpcionesPreferidas = () => {

    const azenApi = useAzenApi();

    return useQuery<OpcionPreferido[]>(['opcionesPreferidas'], async () => {
        const { data } = await azenApi.get(`opcionesPreferidas`);
        return data;
    }, {
        retry: 1,
    });
};