import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom"; // Import Link if using React Router
import Navigation from "../navigation";
import * as userClient from "../userClient";

function Profile() {
    const [error, setError] = useState("");
    //const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setCredentials({...credentials, username: e.target.value})
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setCredentials({...credentials, password: e.target.value})
    };


    const navigate = useNavigate();
    const signup = async () => {
        try {
            await userClient.signup(credentials);
            navigate("./login");
        } catch (err) {
            setError(err.response.data.message);
        }
    }
    const handleSubmit = (e) => {
        signup();
        console.log("Form submitted:", {username, password});
    };

    return (
        <div>
            <Navigation />
            <section className="py-5">
                <div className="container py-5">
                    <div className="row mb-4 mb-lg-5">
                        <div className="col-md-8 col-xl-6 text-center mx-auto">
                            <p className="fw-bold sage mb-2">Sign up</p>
                            <h1 className="fw-bold">Welcome!</h1>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="card">
                                <div className="card-body text-center d-flex flex-column align-items-center">
                                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                        <i className="bi bi-person-fill bs-icon-lg bs-icon-circle bs-icon-primary"></i>
                                    </div>
                                    <form onSubmit={handleSubmit} data-bs-theme="light">
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                //type="email"
                                                name="username"
                                                placeholder="username"
                                                value={username}
                                                onChange={handleUsernameChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn shadow d-block w-100" style={{ backgroundColor: '#9DC183', color: 'white' }} type="submit">
                                                Sign up
                                            </button>
                                        </div>
                                    </form>
                                    <p className="text-muted">
                                        Already have an account?&nbsp;
                                        <Link to="./login" className="sage">
                                            Log In
                                        </Link>
                                    </p>
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
    )
}

export default Profile;