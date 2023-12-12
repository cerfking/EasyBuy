import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const COMMENTS_API = `${BASE_API}/api/comments`;
export const createComment = async (comment) => {
    const response = await request.post( `${COMMENTS_API}`, comment );
    return response.data;
};

export const findCommentById = async (id) => {
    const response = await request.get( `${COMMENTS_API}/${id}`);
    return response.data;
};
export const findCommentsByUser = async (username) => {
    const response = await request.get(`${COMMENTS_API}/username/${username}`);
    return response.data;
};
export const findCommentsByItem = async (item) => {
    const response = await request.get(`${COMMENTS_API}/item/${item._id}`);
    return response.data;
};
export const deleteComment = async (comment) => {
    const response = await request.delete(
        `${COMMENTS_API}/${comment._id}`);
    return response.data;
};


