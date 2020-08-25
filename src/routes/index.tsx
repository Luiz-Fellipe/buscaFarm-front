import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import ManageMedicines from '~/pages/ManageMedicines';
import Employees from '~/pages/Employees';
import Budgets from '~/pages/Budgets';
import EmployeeRegistration from '~/pages/EmployeeRegistration';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/medicamentos" component={ManageMedicines} isPrivate />
    <Route path="/funcionarios" component={Employees} isPrivate />
    <Route path="/orcamentos" component={Budgets} isPrivate />
    <Route
      path="/cadastro-de-funcionarios"
      component={EmployeeRegistration}
      isPrivate
    />
  </Switch>
);

export default Routes;
