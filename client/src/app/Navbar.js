import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { requestFailed } from "../features/users/usersSlices";
import { clearProfile } from "../features/profiles/profilesSlice";

const Navbar = () => {
  const onClick = (requestFailed, clearProfile) => {
    dispatch(requestFailed());
    dispatch(clearProfile());
  };
  const dispatch = useDispatch();
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/" onClick={() => onClick(requestFailed, clearProfile)}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const auth = useSelector((state) => state.users);
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>

      {!auth.loading && (
        <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
