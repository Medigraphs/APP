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
import confirmRegistrationReducer from "./confirmRegistrationSlice";

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
        confirmRegistration: confirmRegistrationReducer,
    }
})

export default store;