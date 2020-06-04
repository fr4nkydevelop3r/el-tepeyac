import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProductsList from './FonditaOwner/ProductsList';
import TodayMenu from './FonditaCustomer/TodayMenu';
import ViewOrder from './FonditaCustomer/ViewOrder';
import OrderConfirmation from './FonditaCustomer/OrderConfirmation';
import CheckoutForm from './FonditaCustomer/CheckoutForm';

import SignIn from './FonditaOwner/SignIn';
import Orders from './FonditaOwner/Orders';
import TodayMenuOwner from './FonditaOwner/TodayMenuOwner';
import NewProduct from './FonditaOwner/NewProduct';
import Menu from './FonditaCustomer/Menu';
import CategoryProducts from './FonditaCustomer/CategoryProducts';
import Dashboard from './FonditaOwner/Dashboard';
import PrivateRoute from './FonditaOwner/PrivateRoute';
import NotFound from './FonditaCustomer/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Menu}>
            {' '}
            <Menu />{' '}
          </Route>
          <Route exact path="/view-order">
            {' '}
            <ViewOrder />{' '}
          </Route>

          <Route exact path="/checkout">
            {' '}
            <CheckoutForm />{' '}
          </Route>
          <Route exact path="/order/:id">
            {' '}
            <OrderConfirmation />{' '}
          </Route>

          <Route exact path="/today-menu">
            {' '}
            <TodayMenu />{' '}
          </Route>

          <Route exact path="/menu">
            {' '}
            <Menu />{' '}
          </Route>

          <Route exact path="/menu/:category">
            <CategoryProducts />
          </Route>

          <Route exact path="/order-confirmation">
            <OrderConfirmation />
          </Route>

          <Route exact path="/sign-in">
            <SignIn />
          </Route>

          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute exact path="/today-menu-owner">
            {' '}
            <TodayMenuOwner />{' '}
          </PrivateRoute>
          <PrivateRoute exact path="/products-list">
            {' '}
            <ProductsList />{' '}
          </PrivateRoute>
          <PrivateRoute exact path="/new-product">
            {' '}
            <NewProduct />{' '}
          </PrivateRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
