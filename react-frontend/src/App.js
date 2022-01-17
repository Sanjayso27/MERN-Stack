import React, { useState, useCallback } from "react";
// these hooks can only be used in functional components
import { useParams } from "react-router-dom";
// named exports we should use this syntax
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UserPlaces from "./places/pages/UserPlaces";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        {/* this is dynamic route with userId parameter and we can extract the param in the loaded component*/}
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        {/* here the order matters if placeId above places/new then places/new never reached */}
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    // whenever isLoggedIn changes the new values is passed into all components which are interested
    // used for app-wide state management
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      {/* every component has access to this context */}
      {/*which pages are loaded based on the urls*/}
      <Router>
        <MainNavigation />
        {/* route can only be used in router component 
    matching url happens frmom top to bottom*/}
        {/* important content of a document should be inside main tag */}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
