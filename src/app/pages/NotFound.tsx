import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            This Page isn't exist <Link to={"/"}>Go to the Home</Link>
        </div>
    );
};

export default NotFound;
