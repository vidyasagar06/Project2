import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const navigate = useNavigate();

    const RegisterUser = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user', {
                firstname,
                lastname,
                email,
                password,
                confirmpassword
            });
            console.log(response);
            alert('Registered successfully');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert('Failed to register');
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={RegisterUser}>
                <label>First name:</label>
                <input
                    type="text"
                    placeholder="Your first name"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <br /><br />
                <label>Last name:</label>
                <input
                    type="text"
                    placeholder="Your last name"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <br /><br />
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br /><br />
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br /><br />
                <label>Confirm password:</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    required
                />
                <br /><br />
                <button onClick={RegisterUser}>REGISTER</button>
            </form>
        </div>
    );
};

export default Register;
