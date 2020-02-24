import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import TodayMenuProvider from './providers/TodayMenuProvider';
import App from './components/App';

ReactDOM.render(
  <Router>
    <TodayMenuProvider>
      <App />
    </TodayMenuProvider>
  </Router>,
  document.getElementById('root'),
);
