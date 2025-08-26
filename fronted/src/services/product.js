import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/product`;


export const getProducts = async () => {
    try {
        const res=await axios.get(`${BASE_URL}/get`)   
 
        return { data: res.data, status: res.status };
    }
    catch (error) {
        return error.res.status;
    }



}