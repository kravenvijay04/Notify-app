import React, { useState } from "react";
import "./profileInfo.css";
import { getInitial } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onlogout }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleTogglePopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <>
      {isPopupVisible && (
        <div id="pop-info">
          <p>Username: {userInfo?.fullname}</p>
          <p>
            <span id="email">{userInfo?.email}</span>
          </p>
          <button id="logout-btn1" onClick={onlogout}>
            Logout
          </button>
        </div>
      )}
      <div id="b"></div>
      <div id="box-profile">
        <div id="nameID" onClick={handleTogglePopup}>
          {getInitial(userInfo?.fullname || "Guest")}
        </div>
        <button id="logout-btn" onClick={onlogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default ProfileInfo;
