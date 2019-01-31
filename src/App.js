import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserLogin from "./Components/UserLogin/UserLogin";
import FormElements from "./Components/FormElements/FormElements";
import mainStyle from "../../styles/Main.css";

class App extends Component {
  render() {
    return (
      <div>
        <UserLogin />

        <p>Hello</p>
      </div>
    );
  }
}

export default App;
