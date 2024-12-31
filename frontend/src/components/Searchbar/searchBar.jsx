// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./searchBar.css"
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
// eslint-disable-next-line react/prop-types 
const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div id='box'>
      <input type="text" onChange={onChange} value={value} placeholder='Search Notes' id='search'/>
      {value && <IoMdClose id='close' onClick={onClearSearch}/>}
      <FaMagnifyingGlass id='glass' onClick={handleSearch}/>
    </div>
    
  )
}

export default SearchBar
