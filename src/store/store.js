import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import singleBlogReducer from "./singleBlogSlice";
import loginReducer from "./loginSlice";


const store = configureStore({
    reducer:{
        blog: blogsReducer,
        singleBlog: singleBlogReducer,
        login: loginReducer,
    }
})

export default store;