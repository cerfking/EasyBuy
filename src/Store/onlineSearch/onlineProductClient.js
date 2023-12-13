import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const ONLINE_ITEMS_API = `${BASE_API}/api/onlineItems`;
export const createOnlineItem = async (onlineItem) => {
    const response = await request.post( `${ONLINE_ITEMS_API}`, onlineItem );
    return response.data;
};
export const findAllOnlineItems = async () => {
    const response = await request.get(`${ONLINE_ITEMS_API}`);
    return response.data;
};

