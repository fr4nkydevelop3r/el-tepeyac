import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createGlobalStyle } from 'styled-components';
import reducer from './reducers';
import middleware from './middleware';
import TodayMenuProvider from './providers/TodayMenuProvider';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors } from './colors';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const store = createStore(reducer, middleware);

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Ubuntu Condensed', sans-serif;
    background-color: ${colors.grayLight};
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <TodayMenuProvider>
        <Elements stripe={stripePromise}>
          <GlobalStyle />
          <App />
        </Elements>
      </TodayMenuProvider>
    </Router>
  </Provider>,

  document.getElementById('root'),
);
