import React from 'react';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    backgroundImage: 'url(https://smehealthcheck.credilinq.ai/static/images/header-bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '150px', // Adjust the height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '30px',
    position: 'relative', // Add position relative to enable absolute positioning of the logo
   
  };

  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    top: '30px', // Adjust the top position as needed
    left: '150px', // Adjust the left position as needed
    width: '130px', // Adjust the width as needed
    height: 'auto', // Adjust the height as needed to maintain the aspect ratio
  };

  return (
    <div style={headerStyle}>
        <div>

      <img
        src="https://smehealthcheck.credilinq.ai/static/images/logo.svg"
        alt="Logo"
        style={logoStyle}
        />
      SME HealthCheck - Get Started
    </div>
        </div>
  );
};

export default Header;
