import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updatePhoneNumber, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const register = createAsyncThunk("register", async ({ email, password, name, phoneNumber, photoURL = undefined }) => {
    let res = undefined;
    try {
        res = await createUserWithEmailAndPassword(auth, email, password);
        // Update user profile with name
        await updateProfile(res.user, {
            displayName: name,
            photoURL: photoURL
        });
        // WIP
        // await updatePhoneNumber(res.user, {
        //     phoneNumber: phoneNumber
        // });
        return {
            displayName: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
            phoneNumber: res.user.phoneNumber
        };
    } catch(e) {
        console.log(e);
        return e;
    }
})

const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.isError = false;
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        })
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default registerSlice.reducer;