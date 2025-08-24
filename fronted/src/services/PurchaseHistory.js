import axios from "axios";

const BASE_URL = "https://localhost:7113/api/Purchase";



export const updatePurchase = async (pur) => {
    try {
   
        const res = await axios.put(`${BASE_URL}/update/${pur.id}`, pur, {
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

export const deletePurchase = async (id) => {
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


export const addPurchase = async (pur) => {
    try {
        const res = await axios.post(`${BASE_URL}/add`, pur, {
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

export const getPurchase = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/get`)
        return { data: res.data, status: res.status };
    }

    catch (error) {
        return error.res.status;
    }
}

export const getPurchaseByUser = async (user) => {
    try {
        const res = await axios.post(`${BASE_URL}/getPurchase`, user, {
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



