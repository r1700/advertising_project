import axios from "axios";


const BASE_URL = "https://localhost:7113/api/subscriptions";

export const getSubScriptionList = async () => {
    try {
        
        const res = await axios.get(`${BASE_URL}/get`)
        return { data: res.data, status: res.status };
    }

    catch (error) {
        return error.res.status;
    }
}






