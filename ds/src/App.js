import React, { useState } from "react";
import Home from "./Home";
import Delivery from "./Delivery";
import Payment from "./Payment";
import Admin from "./Admin";
import Registration from './Registration'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/delivery" component={Delivery}></Route>
          <Route path="/payment" component={Payment}></Route>
          <Route path="/admin-panel" component={Admin}></Route>
          <Route path="/registration" component={Registration}></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
