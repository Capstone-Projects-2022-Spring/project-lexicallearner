import React from "react";
import Navbar from "../components/navbar/Navbar";
import * as BsIcons from "react-icons/bs";
import "./Login.css";

const Login = () => {
    return (
        <div className="Login">
            <Navbar />
            <div>
                <h1>User Registration</h1>
            </div>
            <footer>
                <span>Lexical</span>
            </footer>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Username</label>
                <input className="input" type="text" />

                <label className="label">Email</label>
                <input className="input" type="email" />

                <label className="label">Password</label>
                <input  className="input"  type="password" />

                <button>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
