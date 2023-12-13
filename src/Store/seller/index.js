import React, { useState, useEffect } from "react";
import { BsCheck, BsTrash3Fill, BsPlus, BsPencil } from "react-icons/bs";
import Navigation from "../navigation";
import * as userClient from "../userClient";
import * as followClient from "../followClient";
import {useNavigate, useParams} from "react-router-dom";
import * as itemClient from "../products/itemClient"

function Seller() {
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState({});
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        setAccount(user);
    };
    const findProducts = async (username) => {
        try {
            const products = await itemClient.findItemByUser(username);
            setProducts(products.filter((product) => product !== null));

        } catch (error) {
            console.error("Error finding products:", error);
        }
    };

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
    useEffect(() => {
        if (account) {
            findProducts(account.username);
            setProduct({ ...product, seller: account._id });
        } else {
            console.log("no account");
        }
    }, [account]);

    const fetchProducts = async () => {
        // Your fetch products logic goes here
    };

    const createProduct = async () => {
        // Your create product logic goes here
        try {

            const newProduct = await itemClient.createItem(product);
            setProducts([newProduct, ...products]);
        } catch (err) {
            console.log(err);
        }
    };

    const selectProduct = async (product) => {
        // Your select product logic goes here
        console.log("select product")
        try {
            //const p = await itemClient.findItemById(product._id);
            setProduct(product);
        } catch (err) {
            console.log(err);
        }
    };

    const updateProduct = async () => {
        // Your update product logic goes here
        try {
            const status = await itemClient.updateItem(product);
            setProducts(products.map((p) => (p._id === product._id ? product : p)));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (product) => {
        // Your delete product logic goes here
        try {
            await itemClient.deleteItem(product);
            setProducts(products.filter((p) => p._id !== product._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch actual products when component mounts
    }, []);

    return (
        <div>
            <Navigation />
            <div>
                <div style={{ color: '#9DC183', textAlign: "center" }}>
                    <h1>Product List</h1>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image URLs</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>
                            <input value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })}/>
                        </td>
                        <td>
                            <input value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}/>
                        </td>
                        <td>
                            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })}/>
                        </td>
                        <td>
                            <input value={product.images ? product.images.join(", ") : ""} onChange={(e) => setProduct({ ...product, images: e.target.value.split(", ") })}/>
                        </td>
                        <td className="text-nowrap">
                            <button className="btn btn-secondary me-1" onClick={() => updateProduct()}>
                                <BsCheck /> Update
                            </button>
                            <button className="btn btn-success me-1" onClick={() => createProduct()}>
                                <BsPlus /> Create
                            </button>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.images.join(", ")}</td>
                            <td>
                                <button className="btn btn-danger me-2" onClick={() => deleteProduct(product)}>
                                    <BsTrash3Fill /> Delete
                                </button>
                                <button className="btn btn-warning me-2" onClick={() => selectProduct(product)}>
                                    <BsPencil  /> Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Seller;