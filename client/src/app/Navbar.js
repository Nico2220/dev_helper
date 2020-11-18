import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/users/usersSlices";

const Navbar = () => {
  const dispatch = useDispatch();
  const authLinks = (
    <ul>
      <li>
        <Link to="/" onClick={() => dispatch(logout())}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const gestLinks = (
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
        <Fragment>{auth.isAuthenticated ? authLinks : gestLinks}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
