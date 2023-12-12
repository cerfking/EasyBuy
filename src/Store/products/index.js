import React from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../navigation";
import ProductList from "./productList";
function Products(){
    return (
        <div>
            <Navigation />
            <ProductList/>
        </div>
    );
}

export default Products;