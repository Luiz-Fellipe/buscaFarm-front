import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '~/styles/global';
import Routes from '~/routes';
import Header from './components/Header';

const App: React.FC = () => (
  <>
    <Header />
    <Router>
      <Routes />
    </Router>
    <GlobalStyle />
  </>
);

export default App;
