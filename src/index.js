import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import Dashboard from "./Components/Dashboard";
import Menu from "./Components/Menu";
import UsersOverview from "./Components/UsersOverview";
import NewEvent from "./Components/NewEvent";
import SignIn from "./Components/SignIn";
import Events from "./Components/Events"
import RegisterUser from "./Components/RegisterUser";

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/home">
            <Dashboard />
          </Route>
          <Route exact path="/users">
            <UsersOverview />
          </Route>
          <Route exact path="/event/new">
            <NewEvent />
          </Route>
            <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/register">
            <RegisterUser />
          </Route>
        </Switch>
      </div>
    );
  }
}

//===========================

ReactDOM.render(<Main />, document.getElementById("root"));
