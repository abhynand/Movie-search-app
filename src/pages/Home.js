import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "../firebaseConfig";
import "../App.css";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchMovies = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setMovies([]);
            return;
        }

        setLoading(true);
        try {
            console.log(`Searching for: ${searchQuery}`);

            const response = await axios.get(
                `https://www.omdbapi.com/?s=${searchQuery}&apikey=e1f82fbb`
            );

            console.log("OMDb Response:", response.data);

            if (response.data.Search) {
                setMovies(response.data.Search);
            } else {
                console.log("No movies found.");
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchMovies(query);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="app">
            <div className="header">
                <h1>Movie Info App</h1>
            </div>
            <div className="buttons">
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </form>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : movies.length > 0 ? (
                <div className="movie-list">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie-card">
                            <img
                                src={
                                    movie.Poster !== "N/A"
                                        ? movie.Poster
                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                }
                                alt={movie.Title}
                            />
                            <h3>{movie.Title}</h3>
                            <p>Year: {movie.Year}</p>
                        </div>
                    ))}
                </div>
            ) : (
                query && <p className="no-results">Movie not found</p>
            )}
        </div>
    );
};

export default HomePage;
