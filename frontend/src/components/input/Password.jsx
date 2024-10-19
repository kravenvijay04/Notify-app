// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import './password.css'
// eslint-disable-next-line react/prop-types
const Password = ({ value, onChange, placeholder }) => {
    const [showpassword, setshowpassword] = useState(false);

    const togglePassword = () => {
        setshowpassword(!showpassword);
    }
    return (
        <div className="password-wrapper">
            <input type={showpassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Password"}
                className='input-box'
            />

            {showpassword ? (<FaRegEye
                className="password-toggle-icon"
                size={22}
                onClick={() => togglePassword()}
            />) : (<FaRegEyeSlash
                size={22}
                className="password-toggle-icon"
                onClick={() => togglePassword()} />)}
        </div>
    )
}

export default Password;
