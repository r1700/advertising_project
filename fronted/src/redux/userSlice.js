import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as UserServices from "../services/UserServices";
import { AddUser } from "../services/UserServices";
import { UpdateUser } from "../services/UserServices";

export const fetchLogin = createAsyncThunk(
    "users/fetchLogin",
    async (user) => {
        const res = await UserServices.LogIn(user);
        return res;
    }
);

export const fetchSignUp = createAsyncThunk(
    "users/fetchSignUp",
    async (user) => {
        const res = await UserServices.AddUser(user);
        return res;
    }
);
export const fetchUpdateUser = createAsyncThunk(
    "users/fetchUpdateUser",
    async (user) => {
        const res = await UpdateUser(user);
        return res;
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        // currentUser: null,
        users: {},
        loading: false,
        error: null,
    },
    reducers: {
       
        getDetailes: (state, action) => {
            // return state.currentUser
            return state.users
        },

        logout: (state) => {
            console.log("logout");
            state.users = {};
            state.loading = false;
            state.error = null;
            console.log("state.users", state.users);

        }

    },
    // extraReducers- מגיע אחרי הפעולות ב-createAsynThunk
    extraReducers: (builder) => {
        builder
            // אמצע פעולה
            .addCase(fetchLogin.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload login", action.payload);

                state.users = action.payload;// action.payload=res.data
                console.log("state.users login", state.users);

              
            })
            // הפעולה נכשלה
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchSignUp.pending, (state) => {
                state.loading = true;
            })
            // הפעולה הצליחה
            .addCase(fetchSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;// action.payload=res.data
            })
            // הפעולה נכשלה
            .addCase(fetchSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUpdateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpdateUser.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload update", action.payload);

                state.users = action.payload; // עדכן את הנתונים
                console.log("state.users update", state.users);

            })
            .addCase(fetchUpdateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});
export const { setemailDetails, sePasswordDetails, getDetailes, logout } = userSlice.actions;
export default userSlice.reducer;