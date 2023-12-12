import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Navigation from "../navigation";
import img from "../../../src/productImages/user.png";
import * as userClient from "../userClient";

function Profile(){
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        console.log("findUserById");
        setAccount(user);
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
    return (
        <div>
            <Navigation />
            <section className="py-5 d-flex justify-content-center align-items-center">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold text-success mb-2"></p>
                            <h2 className="fw-bold">Profile</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-lg-6 offset-lg-0">
                            <div className="text-center">
                                <img className="rounded mb-3 fit-cover" width="250" height="250" src={account ? account.avatar : img}></img>
                                <h5 className="fw-bold mb-0"></h5>
                                <p className="text-muted mb-2"></p>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <div className="w-100"></div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center">
                            <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-person bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-">Profile Name</h6>
                                        <p className="text-muted mb-0">{account ? account.profileName : "mock profileName"}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-person-circle bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Username</h6>
                                        <p className="text-muted mb-0">{account ? account.username : "mock username"}</p>


                                    </div>
                                </div>
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-key bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Password</h6>
                                        <p className="text-muted mb-0">{account ? account.password : "********"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-4 d-flex justify-content-center align-items-center">
                            <div className="d-flex flex-wrap flex-md-column justify-content-md-start align-items-md-start h-100">
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-telephone bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Phone</h6>
                                        <p className="text-muted mb-0">{account ? account.phone : "1234567890"}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-envelope bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Email</h6>
                                        <p className="text-muted mb-0">{account ? account.email : "mock email"}</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center p-3">
                                    <i className="bi bi-geo-alt-fill bs-icon-md bs-icon-circle bs-icon-primary"></i>
                                    <div className="px-2">
                                        <h6 className="fw-bold mb-0">Address</h6>
                                        <p className="text-muted mb-0">{account ? account.address : "mock address"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <Link to="./editProfile" className="edit-profile-link">
                                <strong>Edit Profile</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;