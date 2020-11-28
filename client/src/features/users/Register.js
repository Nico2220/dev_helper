import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { setAlert, removeAlert } from "../alerts/alertsSlice";
import { register } from "./usersSlices";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      const id = nanoid();
      console.log(id);
      dispatch(
        setAlert({
          id,
          msg: "password is not match",
          alertType: "danger",
        })
      );

      setTimeout(() => dispatch(removeAlert()), 1000);
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              value={name}
              type="text"
              placeholder="Name"
              name="name"
              // required
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              value={email}
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={onChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              value={password}
              type="password"
              placeholder="Password"
              name="password"
              // minLength="6"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              value={password2}
              type="password"
              placeholder="Confirm Password"
              name="password2"
              // minLength="6"
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
