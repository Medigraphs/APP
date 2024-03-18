import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Action
export const fetchBlogs = createAsyncThunk("fetchBlogs", async() =>{
    let response = await fetch("https://blog-zo8s.vercel.app/app/v2/getArticles");
    return response.json();
})

const blogsSlice = createSlice({
    name: "blog",
    initialState:{
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchBlogs.pending, (state, action)=>{
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(fetchBlogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(fetchBlogs.rejected, (state, action)=>{
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})


export default blogsSlice.reducer;