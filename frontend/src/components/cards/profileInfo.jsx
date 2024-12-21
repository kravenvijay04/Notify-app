// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./profileInfo.css";
import { getInitial } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onlogout }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && (
        <div id="pop-info"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <p>Username: {userInfo?.fullname}</p>
          <p>Email: <span id="email">{userInfo?.email}</span></p>
        </div>
      )}
      <div id="box-profile">
        <div id="nameID"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {getInitial(userInfo?.fullname || "Guest")}</div>
        <button id="logout-btn" onClick={onlogout}>Logout</button>
      </div>
    </>
  );
};

export default ProfileInfo;
