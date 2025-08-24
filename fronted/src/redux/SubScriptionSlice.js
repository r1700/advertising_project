import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as subScriptions from "../services/SubScription";


export const getSubScription = createAsyncThunk(
    "subscription/getSubScription",

    async () => {
        const res = await subScriptions.getSubScriptionList(); 
        return res;
    }
);

const purchaseHistorySlice = createSlice({
    name: "subscription",
    initialState: {
        subscription: [],
        loading: false,
        error: null,
    },
    // extraReducers- מגיע אחרי הפעולות ב-createAsynThunk
    extraReducers: (builder) => {

        builder

            // אמצע פעולה
            .addCase(getSubScription.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(getSubScription.fulfilled, (state, action) => {
                state.loading = false;             
                state.subscription = action.payload.data;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(getSubScription.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default purchaseHistorySlice.reducer;