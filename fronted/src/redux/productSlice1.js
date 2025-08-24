import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as products from "../services/product";


export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await products.getProducts();
    return res;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [
     
    ],
    loading: false,
    error: null,
  },
  // extraReducers- מגיע אחרי הפעולות ב-createAsynThunk
  extraReducers: (builder) => {
    builder
      // אמצע פעולה
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      // הפעולה הצליחה
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;// action.payload=res.data
      })
      // הפעולה נכשלה
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;