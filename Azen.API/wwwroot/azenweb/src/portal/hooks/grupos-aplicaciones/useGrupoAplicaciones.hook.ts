import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import { GruposAplicaciones } from '../../models/grupo-aplicaciones/GrupoAplicaciones';

export const useGrupoAplicaciones = () => {
    
    const azenApi = useAzenApi();

    return useQuery<GruposAplicaciones[]>(['gruposAplicaciones'], async () => {
        const { data } = await azenApi.get(`gruposAplicaciones`);

        return data;
    }, {
        retry: 1,
    });
};