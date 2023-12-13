import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct, setProducts } from "./productsReducer";
import * as itemClient from "./itemClient";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userClient from "../userClient";
import {createItem} from "./itemClient";

import axios from 'axios';
const AV = require("leancloud-storage");
const { Query, User } = AV;



function ProductList() {
    const products = useSelector((state) => state.productsReducer.products);
    const product = useSelector((state) => state.productsReducer.product);
    const [searchQuery, setSearchQuery] = useState("");

    const currentUser = " ";
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        setAccount(user);
    };
    const handleAddProduct = () => {
        itemClient.createItem(product).then((product) => {
            dispatch(addProduct(product));
        });
    };
    const handleDeleteProduct = (item) => {
        itemClient.deleteItem(item).then((status) => {
            dispatch(deleteProduct(item._id));
        });
    };

    const handleAddToCart = async (item) => {
        if (!account) {
            alert("Please log in");
        } else {

            itemClient.addToCart(account, item).then((status) => {
                alert("Successfully added to cart")
            });
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts =
        products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);



    useEffect(() => {
        itemClient.findAllItems().then((items) =>
            dispatch(setProducts(items))
        );
    }, [dispatch]);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await findUserById(id);
            } else {
                await fetchAccount();
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder="Search locally..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            style={{ marginLeft: '10px' }}
                            className="form-control"
                        />


                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <Link to={`./product/${product._id}`}>
                                <img src={product.images[0]} className="card-img-top" alt={`Product ${index}`} />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>

                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <button className="btn btn-lg" style={{ backgroundColor: '#9DC183', color: 'white' }}
                                        onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                                <span className="badge bg-secondary">Price: {product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
