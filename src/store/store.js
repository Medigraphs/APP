import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import singleBlogReducer from "./singleBlogSlice";

const store = configureStore({
    reducer:{
        blog: blogsReducer,
        singleBlog: singleBlogReducer,
    }
})

export default store;