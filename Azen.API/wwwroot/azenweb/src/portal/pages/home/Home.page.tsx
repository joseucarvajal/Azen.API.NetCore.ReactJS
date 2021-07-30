import * as React from "react";

import {QueryClientProvider, QueryClient } from "react-query";
import Portal from "../portal/Portal";


const queryClient = new QueryClient();

const HomePage = () => {
  return (
    <QueryClientProvider client={queryClient}>

        <Portal/>

    </QueryClientProvider>
  );
};
export default HomePage;
