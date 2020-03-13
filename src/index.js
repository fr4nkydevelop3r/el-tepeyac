import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import TodayMenuProvider from './providers/TodayMenuProvider';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <TodayMenuProvider>
        <App />
      </TodayMenuProvider>
    </Router>
  </Provider>,

  document.getElementById('root'),
);
