import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import ManageMedicines from '~/pages/ManageMedicines';
import EmployeesList from '~/pages/Employees/EmployeesList';
import Budgets from '~/pages/Budgets';
import EmployeeRegistration from '~/pages/Employees/EmployeeRegistration';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/medicamentos" component={ManageMedicines} isPrivate />
    <Route path="/funcionarios" component={EmployeesList} isPrivate />
    <Route path="/orcamentos" component={Budgets} isPrivate />
    <Route
      path="/cadastro-de-funcionarios"
      component={EmployeeRegistration}
      isPrivate
    />
  </Switch>
);

export default Routes;
