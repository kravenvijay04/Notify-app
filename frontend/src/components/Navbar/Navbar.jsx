// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Navbar.css';
import { useState } from 'react';
import ProfileInfo from '../cards/profileInfo'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom'
import SearchBar from '../Searchbar/searchBar';
const Navbar = () => {
    const [searchQuery,setSearchQuery]=useState("");
    const navigate = useNavigate;
    const onlogout = ()=>{
    navigate("/login");
  };

  const handleSearch = ()=>{};
  const onClearSearch = () =>{
    setSearchQuery("");
  }
    return (
        <div className="navbar">
            <h1>Notify</h1>
        <SearchBar value={searchQuery} onChange={({target})=>{setSearchQuery(target.value);}}
            handleSearch={handleSearch} onClearSearch={onClearSearch}/>

        <ProfileInfo onlogout={onlogout}/>
        </div>
    )
}

export default Navbar;
