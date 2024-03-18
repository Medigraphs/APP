import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./blogsSlice";
import singleBlogReducer from "./singleBlogSlice";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import registerReducer from "./registerSlice";
import profileReducer from "./profileSlice";
import filterBlogsReducer from "./filterBlogsSlice";
import forgetPasswordReducer from "./forgetPasswordSlice";
import resetPasswordReducer from "./resetPasswordSlice";

const store = configureStore({
    reducer:{
        blog: blogsReducer,
        singleBlog: singleBlogReducer,
        register: registerReducer,
        login: loginReducer,
        logout: logoutReducer,
        profile: profileReducer,
        filterBlogs: filterBlogsReducer,
        forgetPassword: forgetPasswordReducer,
        resetPassword: resetPasswordReducer,
    }
})

export default store;