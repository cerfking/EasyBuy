import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";


import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate, useParams} from "react-router-dom";


import axios from 'axios';


function OnlineProductList() {
    const [onlineProducts, setOnlineProducts] = useState([]);
    const [onlineProduct, setOnlineProduct] = useState();
    const [onlineSearchQuery, setOnlineSearchQuery] = useState("");




    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const handleAddProduct = () => {
    //     itemClient.createItem(product).then((product) => {
    //         dispatch(addProduct(product));
    //     });
    // };

    const handleOnlineSearchInputChange = (event) => {
        setOnlineSearchQuery(event.target.value);
    };


    const searchOnline = async () => {
        const options = {
            method: 'GET',
            url: 'http://api.tmapi.top/shopee/search/items/v2',
            params: {
                apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IlJ1bm5pbmdDb2NvbnV0IiwiQ29taWQiOm51bGwsIlJvbGVpZCI6bnVsbCwiaXNzIjoidG1hcGkiLCJzdWIiOiJSdW5uaW5nQ29jb251dCIsImF1ZCI6WyIiXSwiaWF0IjoxNzAyNDI1MjU4fQ.CpnecSm6yC11Na-dlsotkE_o8koy-prJo9qYu_grQTk',
                keyword: onlineSearchQuery,
                page: 1,
                pageSize:3
            }
        };

        try {



            const  results  = await axios.request(options);

            //
            const newItems = await Promise.all(
                results.data.data.items.map(async (item) => {
                    const itemId = item.item_id;
                    const shopId = item.shop_id;
                    const name = item.title;
                    const description = item.title;
                    const images = item.main_imgs;
                    const price = item.price_info.price;
                    //         const seller = result.get("seller");
                    //         const price = result.get("price");
                    //
                    const newItem = {
                        _id: itemId,
                        shopId:shopId,
                        name: name,
                        description: description,
                        images: images,
                        price: price,
                    };
                    //
                    //         // Wait for the asynchronous operation to complete
                    //         await createItem(newItem);
                    return newItem;
                })
            );
            // Update the local state with new items
            //setItems((prevItems) => [...prevItems, ...newItems]);
            // Dispatch the setProducts action after the state has been updated
            dispatch(setOnlineProducts(newItems));

        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder="Search online..."
                            value={onlineSearchQuery}
                            onChange={handleOnlineSearchInputChange}
                            style={{ marginLeft: '10px' }}
                            className="form-control"
                        />
                        <button
                            onClick={searchOnline}
                            className="btn btn-sm"
                            style={{ backgroundColor: '#9DC183', color: 'white', marginLeft: '10px', marginBottom: '8px' }}
                        >
                            Search Online
                        </button>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {onlineProducts && onlineProducts.map((product, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100">
                            <Link to={`./onlineProduct/${product.shopId}/${product._id}`}>
                                <img src={product.images[0]} className="card-img-top" alt={`Product ${index}`} />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                            </div>

                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <span className="badge bg-secondary">Price: {product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OnlineProductList;
