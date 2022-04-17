import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "./styles/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
    );

    return (
        <div className="Login">
            <Navbar />

            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <label>Email </label>
                            <input type="text" name="uname" required />
                            {renderErrorMessage("uname")}
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" name="pass" required />
                            {renderErrorMessage("pass")}
                        </div>
                        <div className="button-container">
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
                <div className="register">
                    <Link to='/register'>Not Registered Yet? Sign up Here</Link>
                </div>
            </div>

            <span><br />Login Cheat Button</span>
            <p> <button onClick={() => navigate("/homeLoggedIn")}>To Get to Login Quick</button> </p>

        
        </div>
    );
};

export default Login;
