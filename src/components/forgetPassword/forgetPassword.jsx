import React, { useEffect, useState } from "react";
import { forgetPassword } from "../../store/forgetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './forgetPassword.css';

export const ForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const forget_password_state = useSelector((state) => state.forgetPassword);
    const [forgetPasswordState, setForgetPasswordState] = useState(forget_password_state);
    const [email, setEmail] = useState("");
    const [forgetPasswordButton, setForgetPasswordButton] = useState("Search");

    useEffect(() => {
        setForgetPasswordState(forget_password_state);
    }, [forgetPasswordState]);

    useEffect(() => {
        if (forget_password_state.data?.message?.slice(0, 23) === "Email send successfully") {
            navigate('/reset/password');
        }
    }, [forget_password_state]);

    console.log(forget_password_state?.data);

    const handleForgetPassword = async (event) => {
        event.preventDefault();
        setForgetPasswordButton("Searching...");
        await dispatch(forgetPassword(email));
        console.log(email);
        setForgetPasswordButton("Search");
        setEmail("");
    };

    return (
        <div className="forgetPassword-supreme-container">
            <div className="forgetPassword-container">
                <form className="forgetPassword-form-container" onSubmit={handleForgetPassword}>
                    <label htmlFor="email" className="forgetPassword-email-label">Email
                        <input
                            type="text"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="forgetPassword-email-input"
                        />
                    </label>
                    <button type="submit" disabled={forgetPasswordButton === "Searching..."} className="forgetPassword-button">
                        {forgetPasswordButton}
                    </button>
                </form>
            </div>
        </div>
    );
};
