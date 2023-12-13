import React from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../navigation";
import OnlineProductList from "./onlineProductList";

function OnlineProducts(){
    return (
        <div>
            <Navigation />
            <OnlineProductList/>
        </div>
    );
}

export default OnlineProducts;