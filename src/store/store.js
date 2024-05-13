import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./patientsSlice";
import singleBlogReducer from "./singleBlogSlice";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import registerReducer from "./registerSlice";
import filterBlogsReducer from "./filterBlogsSlice";
import forgetPasswordReducer from "./forgetPasswordSlice";
import resetPasswordReducer from "./resetPasswordSlice";
import confirmRegistrationReducer from "./confirmRegistrationSlice";

const store = configureStore({
    reducer:{
        singleBlog: singleBlogReducer,
        register: registerReducer,
        fetchPatients: patientsReducer,
        login: loginReducer,
        logout: logoutReducer,
        filterBlogs: filterBlogsReducer,
        forgetPassword: forgetPasswordReducer,
        resetPassword: resetPasswordReducer,
        confirmRegistration: confirmRegistrationReducer,
    }
})

export default store;