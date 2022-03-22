import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <Navbar />
            <div>
                <h1>Login</h1>
            </div>
            <footer>
                <span>Lexical</span>
            </footer>

            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>

            </Form>
            <span><br />Not Registered Yet? Sign up Here</span>
            <p> <button onClick={() => navigate("/register")}>Register Now</button> </p>

            <span><br />Login Cheat Button</span>
            <p> <button onClick={() => navigate("/homeLoggedIn")}>To Get to Login Quick</button> </p>

        
        </div>
    );
};

export default Login;
