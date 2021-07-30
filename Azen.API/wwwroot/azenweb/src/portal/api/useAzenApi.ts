import axios from "axios";

import {AZEN_API_BASE_URL} from "./constante";

export default function useAzenApi(){
  const azenApi = axios.create({
    baseURL: AZEN_API_BASE_URL,        
  });

  return azenApi;
};