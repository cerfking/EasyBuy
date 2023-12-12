import axios from "axios";

const request = axios.create({
                                 withCredentials: true,
                             });

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const FOLLOWS_API = `${BASE_API}/api/follows`;
//from and to are both usernames
export const follow = async (from, to) => {
    const response = await request.post(`${FOLLOWS_API}/${from}/${to}`);
    return response.data;
};

export const unfollow = async (from, to) => {
    const response = await request.delete(`${FOLLOWS_API}/${from}/${to}`);
    return response.data;
};
export const findFollowings = async (username) => {
    const response = await request.get(`${FOLLOWS_API}/followings/${username}`);
    return response.data;
};
export const findFollowers = async (username) => {
    const response = await request.get(`${FOLLOWS_API}/followers/${username}`);
    return response.data;
};



