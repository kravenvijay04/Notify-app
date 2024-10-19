// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./profileInfo.css";
import { getInitial } from '../../utils/helper';

const ProfileInfo = ( onlogout ) => {
  return (
    <div id='box-profile'>
        <div id='nameID'>{getInitial("vijay kumar")}</div>
        <button id='logout-btn' onClick={onlogout}>Logout</button>
    </div>
  );
}

export default ProfileInfo;
