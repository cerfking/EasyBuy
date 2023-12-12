import React, {useEffect, useState} from "react";
import Navigation from "../../navigation";
import {useNavigate, useParams} from "react-router-dom";
import * as userClient from "../../userClient";
const AV = require("leancloud-storage");
const { Query, User } = AV;


function EditProfile() {


    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const [avatar, setAvatar] = useState(null);
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
    const handleAvatarChange = (event) => {
        const localFile = event.target.files[0];

        // You can perform additional checks here, e.g., file type, size, etc.

        setAvatar(localFile);
        const file = new AV.File("avatar.jpg", localFile);
        console.log("upload avatar")
        file.save().then(
            (file) => {
                //console.log(file.url());
                setAccount({ ...account,
                    avatar: file.url()})
                //console.log(account._id);
                const Avatar = AV.Object.extend("Avatar");
                const avatar = new Avatar();
                avatar.set("user", account._id);
                avatar.set("avatar", file.url());
                avatar.save();
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const save = async () => {
        console.log(account)

        await userClient.updateUser(account);
        navigate("../profile");
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
            <Navigation/>
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <h1 className="fw-bold">Edit Profile</h1>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div>
                                <form className="p-3 p-xl-4" method="post" data-bs-theme="light">
                                    <div className="d-flex align-items-center p-3">
                                        <label htmlFor="avatar-input">
                                            {/* Display current avatar or a placeholder */}
                                            <img
                                                src={account ? account.avatar : "placeholder-url"}
                                                alt="Avatar"
                                                className="bs-avatar-md bs-avatar-circle bs-avatar-primary me-3"
                                                style={{ width: "100px", height: "100px" }}
                                            />
                                            <input
                                                type="file"
                                                id="avatar-input"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                                onChange={handleAvatarChange}
                                            />
                                            Change Avatar
                                        </label>
                                    </div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="text"
                                                                 id="name" name="name"
                                                                 placeholder="Name"
                                                                 value={account ? account.profileName : "mock profileName"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     profileName: e.target.value })}>
                                                        </input></div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="text"
                                                                 id="username" name="username"
                                                                 placeholder="Username"
                                                                 value={account ? account.username : "mock username"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     username: e.target.value })}></input></div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="password"
                                                                 id="password" name="password"
                                                                 placeholder="Password"
                                                                 value={account ? account.password : "password"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     password: e.target.value })}></input></div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="text"
                                                                 id="email" name="email"
                                                                 placeholder="Email"
                                                                 value={account ? account.email : "mock email"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     email: e.target.value })}></input></div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="text"
                                                                 id="address" name="address"
                                                                 placeholder="Address"
                                                                 value={account ? account.address : "mock address"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     address: e.target.value })}></input></div>
                                    <div className="mb-3"><input className="form-control"
                                                                 type="phone"
                                                                 id="phone" name="phone"
                                                                 placeholder="Phone Number"
                                                                 value={account ? account.phone : "1234567890"}
                                                                 onChange={(e) => setAccount({ ...account,
                                                                     phone: e.target.value })}></input></div>
                                    <div>
                                        <button className="btn btn-sage shadow d-block w-100"
                                                onClick={save}
                                        type={"button"}>Update Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                            <div className="col-md-6 col-lg-4 col-xl-4 d-flex justify-content-center justify-content-xl-start">
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
                                            <p className="text-muted mb-0">{account ? account.password : "password"}</p>
                                        </div>
                                    </div>
                                </div>
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
                    </div>
            </section>
            <footer className="bg-primary-gradient"></footer>
            <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
            <script src="../assets/js/bs-init.js"></script>
            <script src="../assets/js/bold-and-bright.js"></script>
        </div>
);
}

export default EditProfile;