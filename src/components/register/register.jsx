import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './register.css';
import { useDispatch, useSelector } from "react-redux";
import {register} from '../../store/registerSlice';

export const Register = () => {
    const dispatch = useDispatch();
    const state = useSelector((state)=> state.register);
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
                setRegisterButton("wait...");
                await dispatch(register({ username, email, password }));
                setRegisterButton("Register");
                setUsername("");
                setEmail("");
                setPassword("");
                confirmPassword("");
            }
        }
    }

    useEffect(()=>{
        setData(state);
    },[state]);

    console.log(data);

    return (
        <div className="register-supreme-container">
            <div className="register-container">
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