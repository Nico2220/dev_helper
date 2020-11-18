import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./app/Navbar";
import Landing from "./app/Landing";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import { Alert } from "./features/alerts/Alert";
import "./App.css";
import setAuthtoken from "./utils/setAuthToken";
import { loadUser } from "./features/users/usersSlices";

import store from "./app/store";

if (localStorage.token) {
  setAuthtoken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
