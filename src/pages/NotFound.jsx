import React from "react";
import pizzacry from "../assets/pizzacry.png";
import "../styles/EmptyOrError.css";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="empty min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="img" onClick={() => navigate("/")}>
        <img src={pizzacry} alt="crying pizza" height={300} />
      </div>

      <div className="dialog">
        <span>Page Not Found</span>
      </div>
        <Link to={"/"}>Go Home</Link>
    </div>
  );
};

export default NotFound;
