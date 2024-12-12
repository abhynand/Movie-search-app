import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../App.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem("token", user.accessToken); // Optional: Store token
            navigate("/");
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem("token", user.accessToken); // Optional: Store token
            navigate("/");
        } catch (error) {
            setError("Error during Google sign-in. Please try again.");
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div className="app">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="search-bar">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
            <div className="google-sign-in">
                <button onClick={signInWithGoogle} className="sign-in">
                    Sign in with Google
                </button>
            </div>
            {error && <p className="no-results">{error}</p>}
        </div>
    );
};

export default LoginPage;
