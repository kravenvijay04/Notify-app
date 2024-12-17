// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar.css';
import { useState } from 'react';
import ProfileInfo from '../cards/profileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Searchbar/searchBar';

const Navbar = ({ userInfo }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // Call useNavigate as a function

    const onlogout = () => {
        localStorage.clear();
        console.log("Logout clicked"); // Add this line to verify if it's triggered
        navigate("/login");
    };


    const handleSearch = () => {
        // Implement your search logic here
    };

    const onClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="navbar">
            <div className='title'>
                <img src="./images/logo.png" alt="notify logo" className='logo' />
                <h1>Notify</h1>
            </div>

            <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
            />
            <ProfileInfo userInfo={userInfo} onlogout={onlogout} />
        </div>
    );
};

export default Navbar;
