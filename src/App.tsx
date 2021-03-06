import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '~/styles/global';
import Routes from '~/routes';
// import Header from './components/Header';

import AppProvider from '~/context';

const App: React.FC = () => (
  <>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
    </Router>
  </>
);

export default App;
