import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const filterBlogs = createAsyncThunk("filterBlogs", async (data) => {

    console.log("Data", JSON.stringify({data}));

    let response = await fetch(`https://blog-zo8s.vercel.app/app/v2/filterArticles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    });

    return response.json();
});


const filterBlogsSlice = createSlice({
    name: "filterBlogs",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(filterBlogs.pending, (state, action) => {
            state.isLoading = true;
            state.data = null;
            state.isError = null;
        })
        builder.addCase(filterBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = null;
        })
        builder.addCase(filterBlogs.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Error", action.payload);
            state.isError = true;
        })
    }
})

export default filterBlogsSlice.reducer;