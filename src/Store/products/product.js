import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as userClient from "../userClient"
import * as itemClient from "./itemClient"
import {findItemById} from "./itemClient";

function Product() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
    };
    const findProductById = async (id) => {
        const product = await itemClient.findItemById(id);
        console.log(product);
        setProduct(product);
    }


    useEffect(() => {
        if (id) {
            console.log("findItemById")
            findProductById(id);
        } else {
            console.log("notFindId")
        }

    }, [id]);

    return (
        <div className="card h-100">
            {product ? product.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    className="card-img-top"
                    alt={`Product ${product._id} - Image ${index + 1}`}
                    style={{ width: '400px', height: '400px', marginLeft: '80px' }}
                />
            )) : ""}
            <div className="card-body">
                <h5 className="card-title">{product ? product.name : "name"}</h5>
                <p className="card-text">{product ? product.description : "description"}</p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
               
                <span className="badge bg-secondary">Price: {product ? product.price : "price"}</span>
            </div>
        </div>
    );
};

export default Product;
