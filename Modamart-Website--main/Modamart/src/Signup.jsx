import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './AuthFile.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Simulate signup
        localStorage.setItem('modamartUser', formData.email);
        navigate('/home');
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <FaUserCircle className="auth-icon" />
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account?{' '}
                    <span onClick={() => navigate('/')}>Sign In</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;