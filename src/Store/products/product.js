import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userClient from "../userClient"
import * as itemClient from "./itemClient"
import {findItemById} from "./itemClient";
import {findCommentsByItem} from "../commentClient";
import {findUserById} from "../userClient";

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
        findProductComments(product);
        setProduct(product);
        //findProductComments();
    }

    const [comment, setComment] = useState('');
    const [productComments, setProductComments] = useState([]);
    const [commentsPosters, setCommentsPosters] = useState([]);

    const findProductComments = async (product) => {
        const comments = await findCommentsByItem(product);
        const posters = await Promise.all(
            comments.map(async (c) => {
                const poster = await findUserById(c.poster);
                return poster;
            })
        );
        setProductComments(comments);
        setCommentsPosters(posters);

    }

    const handleAddComment = (productId) => {
        setProductComments({
            ...productComments,
            [productId]: [...(productComments[productId] || []), comment],
        });
        setComment('');
    };

    useEffect(() => {
        if (id) {
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
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="form-control"
                    />
                    <button
                        onClick={() => handleAddComment(product ? product._id : 'id')}
                        className="btn btn-sm" style={{ backgroundColor: '#9DC183', color: 'white' }}
                    >
                        Add Comment
                    </button>
                </div>
                <h1>Comments</h1>
                <div>
                    {productComments && productComments.map((comment, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <h5>{comment.content}</h5>
                            <p style={{ marginLeft: '200px' }}>by
                                {commentsPosters && commentsPosters[index] ? (
                                    <Link style={{ marginLeft: '10px' }} to={`../profile/${commentsPosters[index]?._id}`}>
                                        {commentsPosters[index]?.profileName}
                                    </Link>
                                ) : (
                                    commentsPosters[index]?.profileName
                                )}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <span className="badge bg-secondary">Price: {product ? product.price : "price"}</span>
            </div>
        </div>
    );
};

export default Product;
