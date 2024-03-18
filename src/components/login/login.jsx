import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/loginSlice";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.login);
    const [JWT, setJWT] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginButton, setLoginButton] = useState("Login");
    const navigate = useNavigate();

    useEffect(()=>{
        setJWT(state.data?.token);
    },[state]);

    useEffect(() => {
        if (JWT) {
            Cookies.set('jwt', JWT, {
                expires : new Date(Date.now() + 5 * 24 * 60 * 60* 1000),
            });
            // navigate('/profile');
        }
    }, [JWT, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginButton("wait...");
        await dispatch(login({ email, password }));
        console.log(email, password);
        setLoginButton("Login");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-main-container">
            <form className="login-container" onSubmit={handleLogin}>
                <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loginButton === "wait..."}>
                    {loginButton}
                </button>
            </form>
        </div>
    );
};
