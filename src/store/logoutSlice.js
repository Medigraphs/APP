import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("logout", async({jwtInCookie})=>{
    // console.log(typeof jwtInCookie);
    let response = await fetch("https://blog-zo8s.vercel.app/app/v1/logout",{
        method: 'PUT',
        // mode: 'no-cors', //Disable the cors(Cross-Origin resource sharing)
        headers: {
            'Content-Type': 'application/json',
        },
        body: jwtInCookie,
    });
    return response.json();
})

const logoutSlice = createSlice({
    name: "logout",
    initialState:{
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) =>{
        builder.addCase(logout.pending, (state, action)=>{
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(logout.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default logoutSlice.reducer;