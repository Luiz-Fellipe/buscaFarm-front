import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '~/styles/global';
import Routes from '~/routes';
// import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <Router>
      {/* <Header /> */}
      <AppProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </AppProvider>

      <GlobalStyle />
    </Router>
  </>
);

export default App;
