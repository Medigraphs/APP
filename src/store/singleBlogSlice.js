import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleBlog = createAsyncThunk("fetchSingleBlog", async(_id)=>{
    let response = await fetch(`https://blog-zo8s.vercel.app/app/v2/getSingleArticle/${_id}`);
    return response.json();
})

const singleBlogSlice = createSlice({
    name: "singleBlog",
    initialState:{
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchSingleBlog.pending, (state, action)=>{
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(fetchSingleBlog.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(fetchSingleBlog.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default singleBlogSlice.reducer;