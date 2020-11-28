import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./usersSlices";
import { useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Login Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Log into Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              value={email}
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              value={password}
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          D'ont have an account? <Link to="/register">Sign up</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
