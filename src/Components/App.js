import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DishesList from './FonditaOwner/DishesList';
import TodayMenu from './FonditaCustomer/TodayMenu';
import ViewOrder from './FonditaCustomer/ViewOrder';
import PlacesAutocomplete from './FonditaCustomer/PlacesAutoComplete';
import OrderConfirmation from './FonditaCustomer/OrderConfirmation';
import CheckoutForm from './FonditaCustomer/CheckoutForm';

import SignIn from './FonditaOwner/SignIn';
import Orders from './FonditaOwner/Orders';
import TodayMenuOwner from './FonditaOwner/TodayMenuOwner';
import NewDish from './FonditaOwner/NewDish';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={PlacesAutocomplete} />
        <Route exact path="/view-order" component={ViewOrder} />
        <Route exact path="/dishes-list" component={DishesList} />
        <Route exact path="/checkout" component={CheckoutForm} />
        <Route exact path="/order/:id" component={OrderConfirmation} />
        <Route exact path="/today-menu" component={TodayMenu} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/today-menu-owner" component={TodayMenuOwner} />
        <Route exact path="/dishes-list" component={DishesList} />
        <Route exact path="/new-dish" component={NewDish} />
      </Switch>
    </div>
  );
}

export default App;
