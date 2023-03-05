import React from 'react';
import {ChakraProvider} from '@chakra-ui/react'

import {QueryClient, QueryClientProvider} from "react-query";
import {Route, Routes} from "react-router";
import Users from "./app/pages/users/Users";
import UserEdit from "./app/pages/users/UserEdit";
import NotFound from "./app/pages/NotFound";

const queryClient = new QueryClient(); /*react query queryClient*/

function App() {
    return (
        <div className={'app'}>
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<Users/>}/>
                        <Route path="user/:id" element={<UserEdit/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Routes>
                </QueryClientProvider>
            </ChakraProvider>
        </div>
    );
}

export default App;
