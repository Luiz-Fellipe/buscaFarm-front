import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import ManageMedicines from '~/pages/ManageMedicines';
import Employees from '~/pages/Employees';
import Budgets from '~/pages/Budgets';
import EmployeeRegistration from '~/pages/EmployeeRegistration';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={SignIn} />
    <Route path="/medicamentos" component={ManageMedicines} />
    <Route path="/funcionarios" component={Employees} />
    <Route path="/orçamentos" component={Budgets} />
    <Route path="/cadastro-de-funcionarios" component={EmployeeRegistration} />
  </Switch>
);

export default Routes;
