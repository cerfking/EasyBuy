import React, { useState, useEffect } from "react";
import {BsCheck, BsTrash3Fill, BsPlus,BsPencil }
    from "react-icons/bs";
import {Link} from "react-router-dom";
import Navigation from "../navigation";
import *  as userClient from "../userClient";

function Admin() {
    // const [users, setUsers] = useState([
    //                                        {
    //                                            _id: 1,
    //                                            username: "john_doe",
    //                                            password: "John",
    //                                            email: "doe@northeastern.edu",
    //                                            avatar: " ",
    //                                            address: "1234 Doe Drive",
    //                                            phone: "508-234-2355",
    //                                            profileName: "Doe",
    //                                            dob:"2023-01-01",
    //                                            role: "BUYER"
    //                                        },
    //                                        // Add more placeholder users here if needed
    //                                    ]);

    //const [user, setUser] = useState({ username: "", password: "", role: "Buyer" });
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "BUYER" });

    const selectUser = async (user) => {
        try {
            const u = await userClient.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await userClient.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };


    const fetchUsers = async () => {
        const users = await userClient.findAllUsers();
        setUsers(users);
    };
    const deleteUser = async (user) => {
        try {
            await userClient.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const createUser = async () => {

    };



    return (
        <div>
            <Navigation/>
            <div>
                <div style={{ color: '#9DC183', textAlign: "center" }}>
                    <h1>User List</h1>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>E-Mail</th>
                            <th>Avatar</th>
                            <th>Profile Name</th>
                            <th>Role</th>
                        </tr>
                        <tr>
                            <td>
                                <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                                <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                            </td>
                            <td>
                                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
                            </td>
                            <td>
                                <input value={user.avatar} onChange={(e) => setUser({ ...user, avatar: e.target.value })}/>
                            </td>
                            <td>
                                <input value={user.profileName} onChange={(e) => setUser({ ...user, profileName: e.target.value })}/>
                            </td>
                            <td>
                                <select  className="form-select" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                                    <option value="BUYER">Buyer</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="SELLER">Seller</option>
                                </select>
                            </td>
                            <td className="text-nowrap">
                                <button className="btn btn-secondary me-1"onClick={() => updateUser()}>
                                    <BsCheck /> Update
                                </button>
                                <button className="btn btn-success me-1" onClick={() => createUser()}>
                                    <BsPlus /> Create
                                </button>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.avatar}</td>
                                <td>{user.profileName}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                        <BsTrash3Fill /> Delete
                                    </button>
                                    <button className="btn btn-warning me-2">
                                        <BsPencil onClick={() => selectUser(user)} /> Edit
                                    </button>
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;

