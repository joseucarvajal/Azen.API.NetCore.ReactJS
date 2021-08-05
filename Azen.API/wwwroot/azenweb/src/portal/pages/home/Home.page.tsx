import * as React from "react";

import {QueryClientProvider, QueryClient } from "react-query";
import { PortalContainer } from "../portal/PortalContainer";



const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>

        <PortalContainer />

    </QueryClientProvider>
  );
};
export default HomePage;
