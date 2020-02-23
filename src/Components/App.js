import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewDish from './NewDish';
import TodayMenu from './TodayMenu';
import DishesList from './DishesList';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/new-dish" component={NewDish} />
        <Route exact path="/today-menu" component={TodayMenu} />
        <Route exact path="/dishes-list" component={DishesList} />
      </Switch>
    </div>
  );
}

export default App;
