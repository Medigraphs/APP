
/* 
------------------------ Deprecated and merge it into filterBlogsSlice.js --------------------------
*/

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const searchBlogs = createAsyncThunk("searchBlogs", async(title) =>{
//     // console.log("title", title);
//     let response = await fetch(`https://blog-zo8s.vercel.app/app/v2/searchArticles/${title}`,{
//         method: 'GET',
//         // mode: 'no-cors', //Disable the cors(Cross-Origin resource sharing)
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     return response.json();
// })

// const searchBlogsSlice = createSlice({
//     name: "searchBlogs",
//     initialState:{
//         isLoading: false,
//         data: null,
//         isError: false,
//     },
//     extraReducers: (builder) =>{
//         builder.addCase(searchBlogs.pending, (state, action)=>{
//             state.isLoading = true;
//             state.data = null;
//             state.isError = null;
//         })
//         builder.addCase(searchBlogs.fulfilled, (state, action)=>{
//             state.isLoading = false;
//             state.data = action.payload;
//             state.isError = null;
//         })
//         builder.addCase(searchBlogs.rejected, (state, action)=>{
//             state.isLoading = false;
//             console.log("Error", action.payload);
//             state.isError = true;
//         })
//     }
// })

// export default searchBlogsSlice.reducer;