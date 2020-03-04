import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewDish from './FonditaOwner/NewDish';
import TodayMenu from './FonditaOwner/TodayMenu';
import DishesList from './FonditaOwner/DishesList';
import Home from './FonditaCustomer/Home';
import ViewOrder from './FonditaCustomer/ViewOrder';
import UserInfo from './FonditaCustomer/UserInfo';
import Orders from './FonditaOwner/Orders';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/view-order" component={ViewOrder} />
        <Route exact path="/new-dish" component={NewDish} />
        <Route exact path="/today-menu" component={TodayMenu} />
        <Route exact path="/dishes-list" component={DishesList} />
        <Route exact path="/user-info" component={UserInfo} />
        <Route exact path="/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default App;
