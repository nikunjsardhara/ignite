import React from 'react';

import CustomLoaderStyled from './CustomLoaderStyled';

const CustomLoader = ({ text }) => (
  <div
    style={{
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}
  >
    <CustomLoaderStyled>
      <div className="spinner"></div>
    </CustomLoaderStyled>

    <div> {text ? text : 'Doing some background work..'}.</div>
    <div style={{fontWeight: 200, color: "#d22630"}}> If it takes longer than usual please logout and login again. </div>
  </div>
);

export default CustomLoader;
