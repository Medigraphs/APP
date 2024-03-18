import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const forgetPassword = createAsyncThunk("forgetPassword", async (email) => {
    let response = await fetch("https://blog-zo8s.vercel.app/app/v1/forgetPassword", {
        method: 'POST',
        // mode: 'no-cors', //Disable the cors(Cross-Origin resource sharing)
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
    return response.json();
})

const forgetPasswordSlice = createSlice({
    name: "forgetPassword",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(forgetPassword.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.isError = false;
        })
        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        })
        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default forgetPasswordSlice.reducer;