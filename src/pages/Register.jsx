import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Form from "react-bootstrap/Form";
import {Button, Alert} from 'react-native';
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0 && confirmPassword.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    function checkPassword(){
        if(password = confirmPassword){
            return true;
        }else{
            return false;
        }

    }
    return (
        <div className="Register">
            <Navbar />
            <div>
                <h1>User Registration</h1>
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
                <Form.Group size="lg" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button title="Register"
                onPress={() => {if(checkPassword){
                }
                    Alert.alert('This checks password')}} block size="lg" type="submit" disabled={!validateForm()
                
                }/>
            </Form>
            </div>
            <footer>
                <span>Lexical Learner</span>
            </footer>
        </div>
    );
};

export default Register;
