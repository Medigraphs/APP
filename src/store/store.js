import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import singleBlogReducer from "./singleBlogSlice";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import registerReducer from "./registerSlice";
import profileReducer from "./profileSlice";
import filterBlogsReducer from "./filterBlogsSlice";

const store = configureStore({
    reducer:{
        blog: blogsReducer,
        singleBlog: singleBlogReducer,
        register: registerReducer,
        login: loginReducer,
        logout: logoutReducer,
        profile: profileReducer,
        filterBlogs: filterBlogsReducer,
    }
})

export default store;