import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import "./styles/Register.css";

const Register = () => {
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

    /*return (
        <div className="Register">
            <Navbar />
            <div>
                <h1>User Registration</h1>
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
                    Register
                </Button>
            </Form>
        </div>
    );*/
    return (
        <div className="Register">
            <Navbar />

            <div className="register-form">
                <div className="title">Register</div>
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
                            <input type="submit" value="Register" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
