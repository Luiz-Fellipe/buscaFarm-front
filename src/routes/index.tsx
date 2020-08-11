import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import ManageMedicines from '~/pages/ManageMedicines';
import Employees from '~/pages/Employees';
import Budgets from '~/pages/Budgets';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/medicamentos" component={ManageMedicines} />
    <Route path="/funcionarios" component={Employees} />
    <Route path="/orçamentos" component={Budgets} />
  </Switch>
);

export default Routes;
