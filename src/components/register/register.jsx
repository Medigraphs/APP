import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './register.css';
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../store/registerSlice';
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state.register);
    const [data, setData] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [RegisterButton, setRegisterButton] = useState("Register");
    const [canSubmit, setCanSubmit] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            setCanSubmit(true);
            if (canSubmit) {
                setRegisterButton("Registering...");
                await dispatch(register({ username, email, password }));
                setRegisterButton("Register");
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }
        }
    }

    useEffect(() => {
        setData(state);
    }, [state]);

    console.log(data);

    // Conditional checking(Started)
    const [getSuccess, setSuccess] = useState(false);
    const [isPasswordError, setPasswordError] = useState(false);
    useEffect(() => {
        if (state && state.data && !state.data.success) {
            if(state?.data?.message?.includes("password")){
                setPasswordError(true);
                setTimeout(() => {
                    setPasswordError(false);
                }, 8000);
            } else{
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 5000);
            }
        }
    }, [state]);

    useEffect(()=>{
        if(state && state.data && state.data.success){
            //Conditionally sending to other component(Started)
            navigate('/confirmRegistration');
            //Conditionally sending to other component(Started)
        }   
    },[state]);

    // Resetting the states
    useEffect(() => {
        setSuccess(false);
        setPasswordError(false);
    }, []);
    // Conditional checking(Ended)


    return (
        <div className="register-supreme-container">
            <div className={`register-container${isPasswordError ? ' error' : ''}`}>
            {isPasswordError && <p className="registerPasswordError-message">Password should have:<br />Minimum 8 characters<br />At least 1 uppercase alphabet <br />At least 1 lowercase alphabet<br />At least 1 number<br />At least 1 special character (!@#$%^&*)</p>}
                {getSuccess && <p className="register-success-message">{state?.data?.message}</p>}
                <form className="register-form-container" onSubmit={handleRegister}>
                    <label htmlFor="username" className="register-username-label">Username
                        <input
                            type="text"
                            value={username}
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="register-username-input"
                        />
                    </label>
                    <label htmlFor="email" className="register-email-label">Email
                        <input
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="register-email-input"
                        />
                    </label>
                    <label htmlFor="password" className="register-password-label">Password
                        <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="register-password-input"
                        />
                    </label>
                    <label htmlFor="confirm-password" className="register-confirm-password-label">Confirm-Password
                        <input
                            type="password"
                            value={confirmPassword}
                            name="confirm-password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="register-confirm-password-input"
                        />
                    </label>
                    <button type="submit" disabled={RegisterButton === "wait..."} className="register-button">
                        {RegisterButton}
                    </button>
                    <div>
                        <p className="login-link-para">Already have an account ? <Link className="login-link-btn" to={'/login'}>Login now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}