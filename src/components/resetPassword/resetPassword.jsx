import React, { useEffect } from "react";
import { useState } from "react";
import './resetPassword.css';
import { resetPassword } from "../../store/resetPasswordSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reset_password_state = useSelector((state) => state.resetPassword);
    const [resetPasswordState, setResetPasswordState] = useState(reset_password_state);
    const [otp, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ResetPasswordButton, setResetPasswordButton] = useState("Reset");
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setResetPasswordState(reset_password_state);
    }, [resetPasswordState])

    console.log(resetPasswordState?.data);

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            setCanSubmit(true);
            if (canSubmit) {
                setResetPasswordButton("Resetting...");
                await dispatch(resetPassword({ otp, password, confirmPassword }));
                setResetPasswordButton("Reset");
                setOTP("");
                setPassword("");
                setConfirmPassword("");
            }
        }
    }

    // Conditional checking(Started)
    const [getSuccess, setSuccess] = useState(false);
    const [successPositive, setSuccessPositive] = useState(false);
    useEffect(() => {
        if (reset_password_state && reset_password_state.data && !reset_password_state.data.success) {
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        }
    }, [reset_password_state]);

    useEffect(() => {
        if (reset_password_state && reset_password_state.data && reset_password_state.data.success) {
            setSuccessPositive(true);
            setTimeout(() => {
                setSuccessPositive(false);
                navigate('/');
            }, 2000);
        }
    }, [reset_password_state]);

    // Resetting the states
    useEffect(() => {
        setSuccess(false);
        setSuccessPositive(false);
    }, []);
    // Conditional checking(Ended)

    return (
        <div className="resetPassword-supreme-container">
            <div className="resetPassword-container">
                {successPositive && <p className="register-success-message">{reset_password_state?.data?.message}</p>}
                {getSuccess && <p className="register-success-message">{reset_password_state?.data?.message}</p>}
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