import {
    useQuery,
} from 'react-query';

import useAzenApi from '../../api/useAzenApi';
import { GrupoAplicaciones } from '../../models/grupo-aplicaciones/GrupoAplicaciones';

export const useGrupoAplicaciones = () => {
    
    const azenApi = useAzenApi();

    return useQuery<GrupoAplicaciones[]>(['gruposAplicaciones'], async () => {
        const { data } = await azenApi.get(`gruposAplicaciones`);

        return data;
    }, {
        retry: 1,
    });
};