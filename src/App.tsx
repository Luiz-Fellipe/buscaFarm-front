import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '~/styles/global';
import Routes from '~/routes';
// import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <Router>
      {/* <Header /> */}
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </Router>
  </>
);

export default App;
