import React from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

const Auth = () => {
  return (
    <div className="auth-bg">
      <Outlet />
    </div>
  );
};

export default Auth;
