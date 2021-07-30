import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import {OpcionFrecuente} from '../../models/opciones-frecuentes/OpcionFrecuente';



export const useOpcionesFrecuentes = () => {

    const azenApi = useAzenApi();

    return useQuery<OpcionFrecuente[]>(['opcionesFrecuentes'], async () => {
        const { data } = await azenApi.get(`opcionesFrecuentes`);

        return data;
    }, {
        retry: 1,
    });
};