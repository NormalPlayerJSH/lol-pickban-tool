import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Banpick from "./Pages/Banpick/Banpick";
import Create from "./Pages/Create/Create";
import Main from "./Pages/Main/Main";
import Join from "./Pages/Join/Join";
import Error from "./Pages/Error/Error";
import CreateComplete from "./Pages/CreateComplete/CreateComplete";
import Test from "./Pages/Test/Test";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/join" component={Join} exact />
        <Route path="/create" component={Create} exact />
        <Route path="/banpick/:code" component={Banpick} exact />
        <Route path="/createcomplete" component={CreateComplete} exact />
        <Route path="/test" component={Test} exact />
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
