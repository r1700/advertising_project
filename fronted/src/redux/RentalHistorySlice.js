
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as rentalHistory from "../services/RentalHistory";



export const updateRealization = createAsyncThunk(
    "relization/updateRealization",
    async (relization) => {
        const res = await rentalHistory.updateRealization(relization);
        return res;
    }
);
export const newRealization = createAsyncThunk(
    "relization/newRealization",
    async (relization) => {
        const res = await rentalHistory.addRealization(relization);
        return res;
    }
);
export const delRealization = createAsyncThunk(
    "relization/delRealization",   
    async (id) => {
        const res = await rentalHistory.deleteRealization(id);
        return res;
    }
);
export const getRealizations = createAsyncThunk(
    "relization/getRealizations",
    async (user) => {
        const res = await rentalHistory.getRealizationByUser(user);
        return res;
    }
);

const RentalHistorySlice = createSlice({
    name: "realization",
    initialState: {
        realization: [],
        loading: false,
        error: null,
    },
    // extraReducers- מגיע אחרי הפעולות ב-createAsynThunk
    extraReducers: (builder) => {

        builder

            // אמצע פעולה
            .addCase(updateRealization.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(updateRealization.fulfilled, (state, action) => {
                state.loading = false;
                // state.realization = action.payload.data;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(updateRealization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // אמצע פעולה
            .addCase(newRealization.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(newRealization.fulfilled, (state, action) => {
                state.loading = false;
                // state.realization = action.payload.data;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(newRealization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // אמצע פעולה
            .addCase(delRealization.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(delRealization.fulfilled, (state, action) => {
                state.loading = false;
                // state.realization = action.payload.data;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(delRealization.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
             // אמצע פעולה
            .addCase(getRealizations.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(getRealizations.fulfilled, (state, action) => {
                state.loading = false;
                state.realization = action.payload;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(getRealizations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default RentalHistorySlice.reducer;