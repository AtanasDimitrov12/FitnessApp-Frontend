// AuthContainer.js
import React, { useState } from 'react';
import './Register.css';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import Overlay from './Overlay';

const AuthContainer = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const toggleRightPanel = (isActive) => {
    setRightPanelActive(isActive);
  };

  return (
    <div className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      <SignUpForm />
      <SignInForm />
      <Overlay toggleRightPanel={toggleRightPanel} />
    </div>
  );
};

export default AuthContainer;
