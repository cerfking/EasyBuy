import React from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../navigation";
import Follow from "./followingList";
function Following(){
    return (
        <div>
            <Navigation />
            <Follow />
        </div>
    );
}

export default Following;