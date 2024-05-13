import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {auth} from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = createAsyncThunk("login", async ({ email, password }) => {
    let res =undefined;
    try {
        res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res.user);
        return {
            accessToken: res.user.accessToken,
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            phoneNumber: res.user.phoneNumber,
            uid: res.user.uid
        };
    } catch(e) {
        console.log(e);
        return e;
    }
})

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.isError = false;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default loginSlice.reducer;