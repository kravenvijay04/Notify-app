// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./profileInfo.css";
import { getInitial } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onlogout }) => {
  return (
    <div id='box-profile'>
      <div id='nameID'>{getInitial(userInfo?.fullname || "Guest")}</div>
      <p>{userInfo?.fullname || "Guest"}</p>
      <button id='logout-btn' onClick={onlogout}>Logout</button>
    </div>
  );
}

export default ProfileInfo;
