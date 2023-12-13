import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {createOnlineItem} from "./onlineProductClient";
import ReactPlayer from 'react-player';





function OnlineProduct() {
    const { shopId } = useParams();
    const { id } = useParams();

    const navigate = useNavigate();
    const [onlineProduct, setOnlineProduct] = useState(null);

    const findOnlineProductById = async (id) => {
        const options = {
            method: 'GET',
            url: 'http://api.tmapi.top/shopee/item_detail',
            params: {apiToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IlJ1bm5pbmdDb2NvbnV0IiwiQ29taWQiOm51bGwsIlJvbGVpZCI6bnVsbCwiaXNzIjoidG1hcGkiLCJzdWIiOiJSdW5uaW5nQ29jb251dCIsImF1ZCI6WyIiXSwiaWF0IjoxNzAyNDI1MjU4fQ.CpnecSm6yC11Na-dlsotkE_o8koy-prJo9qYu_grQTk',
                site: 'my',
                item_id: id,
                shop_id: shopId}
        };
        try {
            const  result  = await axios.request(options);
            console.log(result.data.data.title);
            const newItem = {
                name: result.data.data.title,
                description: result.data.data.title,
                images: result.data.data.main_imgs,
                price: result.data.data.price_info.price,
                video_url: result.data.data.video_url
            };
            setOnlineProduct(newItem);
        } catch (error) {
            console.error(error);
        }

    }

    const handleAddOnlineProductToDatabase = () => {
        createOnlineItem(onlineProduct);
        alert("Successfully add to database");
    };

    useEffect(() => {
        if (id) {
            findOnlineProductById(id);
        } else {
            console.log("notFindId")
        }

    }, [id]);


    return (

        <div className="card h-100">
            <h1>{onlineProduct ? onlineProduct.name : "Details"}</h1>
            {onlineProduct && onlineProduct.video_url && (
                <ReactPlayer
                    url={onlineProduct.video_url}
                    width="60%"
                    height="600px"
                    controls={true}
                    playing={true}

                />
            )}
            {onlineProduct ? onlineProduct.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    className="card-img-top"
                    alt={`Product ${onlineProduct._id} - Image ${index + 1}`}
                    style={{ width: '900px', height: '900px', marginLeft: '80px' }}
                />
            )) : ""}
            <div className="card-body">
                <h5 className="card-title">{onlineProduct ? onlineProduct.name : "name"}</h5>
                <p className="card-text">{onlineProduct ? onlineProduct.description : "description"}</p>




            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <span className="badge bg-secondary">Price: {onlineProduct ? onlineProduct.price : "price"}</span>
            </div>
            <button type={"button"} className={"btn btn-primary"} onClick={handleAddOnlineProductToDatabase}>Add to database</button>
        </div>

    );
};

export default OnlineProduct;
