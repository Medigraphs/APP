import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Action
export const profile = createAsyncThunk("profile", async(token) =>{
    console.log(token);
    let response = await fetch(`https://blog-zo8s.vercel.app/app/v1/getMyDetails/${token}`,{
        method: 'GET',
        // mode: 'no-cors', //Disable the cors(Cross-Origin resource sharing)
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
})

const profileSlice = createSlice({
    name: "profile",
    initialState:{
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) =>{
        builder.addCase(profile.pending, (state, action)=>{
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(profile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(profile.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})


export default profileSlice.reducer;