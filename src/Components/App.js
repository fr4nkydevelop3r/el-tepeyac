import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewDish from './FonditaOwner/NewDish';
import TodayMenuOwner from './FonditaOwner/TodayMenuOwner';
import DishesList from './FonditaOwner/DishesList';
import TodayMenu from './FonditaCustomer/TodayMenu';
import ViewOrder from './FonditaCustomer/ViewOrder';
import UserInfo from './FonditaCustomer/UserInfo';
import Orders from './FonditaOwner/Orders';
import PlacesAutocomplete from './FonditaCustomer/PlacesAutoComplete';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={PlacesAutocomplete} />
        <Route exact path="/view-order" component={ViewOrder} />
        <Route exact path="/new-dish" component={NewDish} />
        <Route exact path="/today-menu-owner" component={TodayMenuOwner} />
        <Route exact path="/dishes-list" component={DishesList} />
        <Route exact path="/user-info" component={UserInfo} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/today-menu" component={TodayMenu} />
      </Switch>
    </div>
  );
}

export default App;
