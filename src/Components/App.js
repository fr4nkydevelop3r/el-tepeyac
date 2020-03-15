import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NewDish from './FonditaOwner/NewDish';
import TodayMenuOwner from './FonditaOwner/TodayMenuOwner';
import DishesList from './FonditaOwner/DishesList';
import TodayMenu from './FonditaCustomer/TodayMenu';
import ViewOrder from './FonditaCustomer/ViewOrder';
import UserInfo from './FonditaCustomer/UserInfo';
import Dashboard from './FonditaOwner/Dashboard';
import PlacesAutocomplete from './FonditaCustomer/PlacesAutoComplete';
import SignIn from './FonditaOwner/SignIn';
import Orders from './FonditaOwner/Orders';
import OrderConfirmation from './FonditaCustomer/OrderConfirmation';

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
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/today-menu" component={TodayMenu} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/order-confirmation" component={OrderConfirmation} />
      </Switch>
    </div>
  );
}

export default App;
