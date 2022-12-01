import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Professional from "./pages/Professional";
import { Students } from "./pages/Students";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path='/students' component={Students} />
        <Route path='/professional' component={Professional} />
      </Switch>
      
    </BrowserRouter>
  );
}

export default Routes;
