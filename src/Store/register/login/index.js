import Navigation from "../../navigation";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as userClient from "../../userClient";


function Login(){
    const [error, setError] = useState("");

    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleUsernameChange = (e) => {
        setCredentials({...credentials, username: e.target.value})
    };

    const handlePasswordChange = (e) => {
        setCredentials({...credentials, password: e.target.value})
    };


    const navigate = useNavigate();
    const signin = async () => {
        await userClient.signin(credentials);
        navigate("../../profile");
    };

    const handleSubmit = (e) => {
        signin();
        console.log("Form submitted:", {credentials});
    };

    return (
        <div>
            <Navigation />
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-4 mb-lg-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold sage mb-2">Login</p>
                            <h1 className="fw-bold">Welcome back!</h1>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-body text-center d-flex flex-column align-items-center">
                                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                        <i className="bi bi-person-fill bs-icon-lg bs-icon-circle bs-icon-primary"></i>
                                    </div>
                                    <form  data-bs-theme="light">
                                        <div className="mb-3"><input className="form-control"  name="username" placeholder="Username" onChange={handleUsernameChange}/></div>
                                        <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={handlePasswordChange}/></div>
                                        <div className="mb-3"><button className="btn shadow d-block w-100"style={{ backgroundColor: '#9DC183', color: 'white' }} type="submit" onClick={handleSubmit}>Log in</button></div>
                                    </form>
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

export default Login;