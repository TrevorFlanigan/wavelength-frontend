import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Room from "./components/Room";
import Error from "./components/Error";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/error" component={Error} />
        <Route path="/:room" component={Room} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
