import React, { useEffect } from "react";
import { useState } from "react";
import './resetPassword.css';
import { resetPassword } from "../../store/resetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";


export const ResetPassword = () => {
    const dispatch = useDispatch();
    const reset_password_state = useSelector((state)=> state.resetPassword);
    const [resetPasswordState, setResetPasswordState] = useState(reset_password_state);
    const [otp, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ResetPasswordButton, setResetPasswordButton] = useState("Reset");
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(()=>{
        setResetPasswordState(reset_password_state);
    },[resetPasswordState])

    console.log(resetPasswordState?.data);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            setCanSubmit(true);
            if (canSubmit) {
                setResetPasswordButton("Resetting...");
                await dispatch(resetPassword({otp, password, confirmPassword} ));
                setResetPasswordButton("Reset");
                setOTP("");
                setPassword("");
                setConfirmPassword("");
            }
        }
    }

    return (
        <div className="resetPassword-supreme-container">
            <div className="resetPassword-container">
                <form className="resetPassword-form-container" onSubmit={handleResetPassword}>
                    <label htmlFor="otp" className="resetPassword-otp-label">OTP
                        <input
                            type="text"
                            value={otp}
                            name="otp"
                            onChange={(e) => setOTP(e.target.value)}
                            className="resetPassword-otp-input"
                        />
                    </label>
                    <label htmlFor="password" className="resetPassword-password-label">Password
                        <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="resetPassword-password-input"
                        />
                    </label>
                    <label htmlFor="confirm-password" className="resetPassword-confirm-password-label">Confirm-Password
                        <input
                            type="password"
                            value={confirmPassword}
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="resetPassword-confirm-password-input"
                        />
                    </label>
                    <button type="submit" disabled={ResetPasswordButton === "Resetting..."} className="resetPassword-button">
                        {ResetPasswordButton}
                    </button>
                </form>
            </div>
        </div>
    );
}