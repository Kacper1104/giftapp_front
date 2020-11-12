import React, { Component } from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.scss";
import Menu from "./Components/Menu";
import SignIn from "./Components/SignIn";
import Events from "./Events/Events"
import RegisterUser from "./Components/RegisterUser";
import { Home } from "./Components/Home"

class Main extends Component {

  render() {
    return (
      <div className="App">
        <Menu />
        <Switch>
          <Route exact path="/">
            {<Home />}
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
