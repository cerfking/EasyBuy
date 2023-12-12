import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import * as follows from "../followClient";
import * as comments from "../commentClient";
import "../index.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import * as userClient from "../userClient";
import * as followClient from "../followClient"

function FollowingList() {
    const { id } = useParams();

    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const followers = ["User A", "User B"]; // Placeholder followers data
    //const [followers, setFollowers] = useState(null);
    //const following = ["User X", "User Y"]; // Placeholder following data
    //const [following, setFollowing] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [followerUsers, setFollowerUsers] = useState([]);
    const favoriteProducts = [
        // Placeholder favorite products data
        { user: "User A", product: "Product 1", image: "image_url_1" },
        { user: "User B", product: "Product 2", image: "image_url_2" },
    ];
    const fetchAccount = async () => {
        const account = await userClient.account();
        setAccount(account);
    };
    const findUserById = async (id) => {
        const user = await userClient.findUserById(id);
        setAccount(user);
    };
    const findFollowings = async (username) => {
        try {
            const followings = await followClient.findFollowings(username);
            const users = await Promise.all(
                followings.map(async (f) => {
                    const user = await userClient.findUserById(f.to);
                    return user;
                })
            );
            setFollowingUsers(users.filter((user) => user !== null));

        } catch (error) {
            console.error("Error finding followings:", error);
        }
    };
    const findFollowers = async (username) => {
        try {
            const followers = await followClient.findFollowers(username);
            const users = await Promise.all(
                followers.map(async (f) => {
                    const user = await userClient.findUserById(f.from);
                    console.log(user);
                    return user;
                })
            );
            setFollowerUsers(users.filter((user) => user !== null));

            console.log(followerUsers);
        } catch (error) {
            console.error("Error finding followings:", error);
        }
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
            findFollowings(account.username);
            findFollowers(account.username);
        } else {
            console.log("no account");
        }
    }, [account]);


    return (
        <div>
            <div style={{ color: '#9DC183', textAlign: "center" }}>
                <h1>EasyBuy Social</h1>
            </div>
            <div className="follow-container">
                <div className="followers">
                    <h2>Followers</h2>
                    <ul>
                        {/*{followers.map((follower, index) => (*/}
                        {/*    <li key={index}><a href={`/${follower}_profile.html`}>{follower}</a></li>*/}
                        {/*))}*/}
                        {followerUsers.map((f, index) => (
                            <Link to={`../profile/${f._id}`}>
                                {f.profileName}
                            </Link>


                        ))}
                    </ul>
                </div>
                <div className="following">
                    <h2>Following</h2>
                    <div className="cards">

                        {followingUsers.map((f, index) => (
                            <div className="follow-card" key={index}>
                                <Link to={`../profile/${f._id}`}>
                                    <h1>{f.profileName}</h1>
                                </Link>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowingList;
