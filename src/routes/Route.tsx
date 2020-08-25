import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '~/components/global/Header';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { employee } = useAuth();

  const Layout: React.FC = () => {
    return isPrivate ? (
      <>
        <Header />
        <Component />
      </>
    ) : (
      <Component />
    );
  };

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!employee ? (
          <Layout />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/medicamentos',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
