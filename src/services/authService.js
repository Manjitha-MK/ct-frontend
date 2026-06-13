import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    const response = await axios.post(
        `${API}/api/auth/register`,
        userData
    );
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(
        `${API}/api/auth/login`,
        userData
    );
    return response.data;
};