import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';
import * as userClient from "../userClient";


function Navigation() {
    const [links, setLinks] = useState([
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/Products' },
        { label: 'Following', path: '/Following' },
        { label: 'Profile', path: '/Profile' },
    ]);
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
    const signout = async () => {
        await userClient.signout();
        alert("Successfully logged out")
        navigate("/");
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
            // Check if the user is a seller
            if (account.role === "SELLER") {
                // Check if the seller link is already present
                const sellerLinkExists = links.some(link => link.label === 'Seller Dashboard');

                if (!sellerLinkExists) {
                    // Add seller link to the array
                    const sellerLink = { label: 'Seller Dashboard', path: '/Seller' };
                    setLinks([...links, sellerLink]);
                }
            }
            if (account.role === "ADMIN") {
                // Check if the seller link is already present
                const adminLinkExists = links.some(link => link.label === 'Admin Dashboard');

                if (!adminLinkExists) {
                    // Add seller link to the array
                    const adminLink = { label: 'Admin Dashboard', path: '/Admin' };
                    setLinks([...links, adminLink]);
                }
            }
        } else {
            console.log("no account");
        }
    }, [account, links]);

    return (
        <nav className="navbar navbar-expand-md sticky-top navbar-shrink py-3 navbar-light" id="mainNav">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="bi-shop fs-2 sage me-2"></span>
                    <span className="webdev-store">EasyBuy</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {links.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink
                                    className="nav-link"
                                    activeClassName="active"
                                    exact
                                    to={link.path}>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {account && <li className="nav-item">
                            <NavLink
                                className="nav-link d-flex align-items-center"
                                activeClassName="active"
                                exact
                                to="/Cart">
                                <span className="fs-6 me-2">Shopping Cart</span>
                                <i className="bi-cart fs-4"></i>
                            </NavLink>
                        </li>}
                        <li className="nav-item">
                            <Link to="/Register" className="nav-link" role="button">
                                <button className="btn btn-lg shadow" style={{ backgroundColor: '#9DC183', color: 'white' }}>
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                        {account ? (
                            <li className="nav-item">
                                <button onClick={signout} className="btn btn-lg shadow" style={{ backgroundColor: 'red', color: 'white' }}>
                                    Log out
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to="/Register/Login" className="nav-link" role="button">
                                    <button className="btn btn-lg shadow" style={{ backgroundColor: '#9DC183', color: 'white' }}>
                                        Log In
                                    </button>
                                </Link>
                            </li>
                        )}

                    </ul>

                </div>
            </div>
        </nav>
    );
}

export default Navigation;
