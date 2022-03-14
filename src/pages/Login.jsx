import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Form from "react-bootstrap/Form";
import {Button, Alert} from 'react-native';
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
            <div className="container">
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
            <Button title="Log In'" onPress={() => navigate("/homeLoggedIn")} block size="lg"/>
            <span>Not Registered Yet? Sign up Here</span>
            <Button title="Sign Up'" onPress={() => navigate("/register")} block size="lg"/>
            
            
            
            </Form>
         
            
            </div>
            <footer>
                <span>Lexical Learner</span>
            </footer>
        </div>
    );
};

export default Login;
