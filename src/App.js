import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UserState from "./Context/User/UserState";

function App() {

  return (
    <UserState>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <LandingPage /> 
            </Route>
            <Route exact path="/home">
               <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserState>
  );
}

export default App;
