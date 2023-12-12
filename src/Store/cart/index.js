import React, {useEffect, useState} from 'react';
import Navigation from '../navigation';
import { Modal } from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as userClient from "../userClient";
import {findItemById} from "../products/itemClient";

function ShoppingCart() {
    const [showModal, setShowModal] = useState(false);
    const [cartItems, setCartItems] = useState([
                                                   { id: 1, name: 'Product 1', price: 20},
                                                   { id: 2, name: 'Product 2', price: 30 },
                                               ]);
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
        const items = await Promise.all(
            account.cart.map(async (i) => {
                const item = await findItemById(i);
                console.log(item);
                return item;
            })
        );
        setCartItems(items.filter((item) => item !== null));

    };
    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        setAccount(user);
    };



    const handleClose = () => {
        setShowModal(false);
        setCartItems([]); // Clear cart items on modal close
    };

    const handleShow = () => setShowModal(true);

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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
            <Navigation />

            <section className="py-5">
                <div className="container py-5">
                    <h2 className="mb-4">Shopping Cart</h2>
                    <div className="row">
                        <div className="col">
                            {cartItems.length > 0 ? (
                                <div>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="card mb-3">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                {/*<p className="card-text">Quantity: {item.quantity}</p>*/}
                                                <p className="card-text">Price: ${item.price}</p>
                                                {item.images && (
                                                    <img src={item.images[0]} width={200} alt="Product Image" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-end">
                                        <p>Total: ${totalPrice}</p>
                                        <button
                                            onClick={handleShow}
                                            className="btn btn-lg"
                                            style={{ backgroundColor: '#9DC183', color: 'white' }}
                                        >
                                            Checkout!
                                        </button>
                                    </div>
                                    <Modal show={showModal} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Checkout</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            You have 'purchased' the items in your cart!
                                            (Payment is not yet supported in EasyBuy)
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className="btn btn-secondary" onClick={handleClose}>
                                                Close
                                            </button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            ) : (
                                 <p>Your shopping cart is empty.</p>
                             )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ShoppingCart;
