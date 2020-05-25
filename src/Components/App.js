import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductsList from './FonditaOwner/ProductsList';
import TodayMenu from './FonditaCustomer/TodayMenu';
import ViewOrder from './FonditaCustomer/ViewOrder';
import PlacesAutocomplete from './FonditaCustomer/PlacesAutoComplete';
import OrderConfirmation from './FonditaCustomer/OrderConfirmation';
import CheckoutForm from './FonditaCustomer/CheckoutForm';

import SignIn from './FonditaOwner/SignIn';
import Orders from './FonditaOwner/Orders';
import TodayMenuOwner from './FonditaOwner/TodayMenuOwner';
import NewProduct from './FonditaOwner/NewProduct';
import Menu from './FonditaCustomer/Menu';
import CategoryProducts from './FonditaCustomer/CategoryProducts';
import OrderError from './FonditaCustomer/OrderError'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={PlacesAutocomplete} />
        <Route exact path="/view-order" component={ViewOrder} />
        <Route exact path="/products-list" component={ProductsList} />
        <Route exact path="/checkout" component={CheckoutForm} />
        <Route exact path="/order/:id" component={OrderConfirmation} />
        <Route exact path="/today-menu" component={TodayMenu} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/today-menu-owner" component={TodayMenuOwner} />
        <Route exact path="/new-product" component={NewProduct} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/menu/:category" component={CategoryProducts} />
        <Route exact path="/order-confirmation" component={OrderError} />

      </Switch>
    </div>
  );
}

export default App;
