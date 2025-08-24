import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PurchaseHistory from "../services/PurchaseHistory";
import { useSelector } from "react-redux";



export const updatePurchase = createAsyncThunk(
    "purchase/updatePurchase",
    async (purchase) => {
        const res = await PurchaseHistory.updatePurchase(purchase);
        return res;
    }
);

export const addPurchase = createAsyncThunk(
    "purchase/addPurchase",
    async (pur) => {
        const res = await PurchaseHistory.addPurchase(pur);
        return res;
    }
);
export const deletePurchase = createAsyncThunk(
    "purchase/deletePurchase",
    async (pur) => {
        const res = await PurchaseHistory.deletePurchase(pur.id);
        return res;
    }
);

export const getPurchase = createAsyncThunk(
    "purchase/getPurchase",
    async (user) => {       
        const res = await PurchaseHistory.getPurchaseByUser(user);
        return res;
    }
);

const purchaseHistorySlice = createSlice({
    name: "purchases",
    initialState: {
        purchases: null,
        loading: false,
        error: null,
    },

    // extraReducers- מגיע אחרי הפעולות ב-createAsynThunk
    extraReducers: (builder) => {
        builder
            // אמצע פעולה
            .addCase(updatePurchase.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(updatePurchase.fulfilled, (state, action) => {
                state.loading = false;
                // state.purchases = action.payload;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(updatePurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // אמצע פעולה
            .addCase(addPurchase.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(addPurchase.fulfilled, (state, action) => {
                state.loading = false;
                // state.purchases = action.payload.data;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(addPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // אמצע פעולה
            .addCase(getPurchase.pending, (state) => {          
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(getPurchase.fulfilled, (state, action) => {
                state.loading = false;             
                state.purchases = action.payload;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(getPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export default purchaseHistorySlice.reducer;