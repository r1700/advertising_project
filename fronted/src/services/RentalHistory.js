import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/Realization`;



export const addRealization = async (realization) => {
    try {
        const res = await axios.post(`${BASE_URL}/add`, realization, {
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
export const updateRealization = async (realization) => {
    try {
        const res = await axios.put(`${BASE_URL}/update/${realization.id}`, realization, {
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


export const deleteRealization = async (id) => {
    try {

        const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
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
export const getRealizationByUser = async (user) => {
    try {
        const res = await axios.post(`${BASE_URL}/getRealization`, user, {
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

