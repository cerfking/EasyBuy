import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const ITEMS_API = `${BASE_API}/api/items`;
export const createItem = async (item) => {
    const response = await request.post( `${ITEMS_API}`, item );
    return response.data;
};
export const findAllItems = async () => {
    const response = await request.get(`${ITEMS_API}`);
    return response.data;
};
export const findItemById = async (id) => {
    const response = await request.get( `${ITEMS_API}/${id}`);
    return response.data;
};
export const findItemByUser = async (username) => {
    const response = await request.get(`${ITEMS_API}/username/${username}`);
    return response.data;
};
export const updateItem = async (item) => {
    const response = await request.put(`${ITEMS_API}/${item._id}`, item);
    return response.data;
};
export const deleteItem = async (item) => {
    const response = await request.delete(
        `${ITEMS_API}/${item._id}`);
    return response.data;
};
export const addToCart = async (user, item) => {
    const response = await request.post(
        `${BASE_API}/api/users/${user.username}/cart/${item._id}`, item);
    return response.data;
};
export const removeFromCart = async (user, item) => {
    const response = await request.delete(`${BASE_API}/api/users/${user.username}/cart/${item._id}`, item);
    return response.data;
};

