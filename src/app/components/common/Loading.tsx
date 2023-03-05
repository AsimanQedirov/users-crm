import React from 'react';
import {Spinner} from "@chakra-ui/react";

const Loading = () => {
    return (
        <div className={'loading'}>
            <Spinner size={'xl'}/>
        </div>
    );
};

export default Loading;
