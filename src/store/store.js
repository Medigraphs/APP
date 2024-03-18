import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import singleBlogReducer from "./singleBlogSlice";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import registerReducer from "./registerSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
    reducer:{
        blog: blogsReducer,
        singleBlog: singleBlogReducer,
        register: registerReducer,
        login: loginReducer,
        logout: logoutReducer,
        profile: profileReducer,
    }
})

export default store;