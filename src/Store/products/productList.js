import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct, setProducts } from "./productsReducer";
import * as itemClient from "./itemClient";
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userClient from "../userClient";
import {createItem} from "./itemClient";
const AV = require("leancloud-storage");
const { Query, User } = AV;

function ProductList() {
    const products = useSelector((state) => state.productsReducer.products);
    const product = useSelector((state) => state.productsReducer.product);
    const [searchQuery, setSearchQuery] = useState("");
    const [onlineSearchQuery, setOnlineSearchQuery] = useState("");
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
    const handleOnlineSearchInputChange = (event) => {
        setOnlineSearchQuery(event.target.value);
    };

    const filteredProducts =
        products.filter((product) =>
                            product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const searchOnline = async () => {
        try {
            const query = new AV.Query("Product");
            query.contains("name", onlineSearchQuery);

            const results = await query.find();

            const newItems = await Promise.all(
                results.map(async (result) => {
                    const name = result.get("name");
                    const description = result.get("description");
                    const images = result.get("images");
                    const seller = result.get("seller");
                    const price = result.get("price");

                    // Create a new item object
                    const newItem = {
                        name: name,
                        description: description,
                        images: images,
                        seller: seller,
                        price: price,
                    };

                    // Wait for the asynchronous operation to complete
                    await createItem(newItem);
                    return newItem;
                })
            );
            // Update the local state with new items
            setItems((prevItems) => [...prevItems, ...newItems]);
            // Dispatch the setProducts action after the state has been updated
            dispatch(setProducts([...items, ...newItems]));
        } catch (err) {
            console.log(err);
        }
    };



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
            <input
                type="text"
                placeholder="Search locally..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{ marginLeft: '10px' }}
            />
            <input
                type="text"
                placeholder="Search online..."
                value={onlineSearchQuery}
                onChange={handleOnlineSearchInputChange}
                style={{ marginLeft: '10px' }}
            />
            <button onClick={searchOnline}>search online</button>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <Link to={`./product/${product._id}`}>
                                <img src={product.images[0]} className="card-img-top" alt={`Product ${index}`}
                                     />
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
