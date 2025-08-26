import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_API_URL}/api/users`;



export const LogIn = async (user) => {
    try {
        
        const res = await axios.post(`${BASE_URL}/getUser`, { email: user.email, password: user.password }, {
            validateStatus: (status) => {
                return status < 500;
            }
        });

        return { data: res.data, status: res.status };
    }
    catch (error) {
        // תמיד להחזיר אובייקט עם status
        return { data: null, status: error };
    }
}

export const AddUser = async (user) => {
    try {
        const res = await axios.post(`${BASE_URL}/add`, user, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        return { data: res.data, status: res.status };
    }
    catch (error) {
        return error.res.status;
    }
}
//update
export const UpdateUser = async (user) => {
    try {
        const res = await axios.put(`${BASE_URL}/update/${user.id}`, user, {
            validateStatus: (status) => {
                return status < 500;
            }
        });
        return { data: res.data, status: res.status };
    }
    catch (error) {
        return error.response?.status || 500;
    }
}




