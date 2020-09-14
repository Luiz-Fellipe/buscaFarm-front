import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import ManageMedicines from '~/pages/ManageMedicines';
import EmployeesList from '~/pages/Employees/EmployeesList';
import Budgets from '~/pages/Budgets';
import EmployeeRegistration from '~/pages/Employees/EmployeeRegistration';
import EmployeeEdit from '~/pages/Employees/EmployeeEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/medicamentos" exact component={ManageMedicines} isPrivate />

    <Route path="/funcionarios" exact component={EmployeesList} isPrivate />
    <Route path="/funcionarios/editar/:id" component={EmployeeEdit} isPrivate />
    <Route
      path="/funcionarios/cadastrar"
      component={EmployeeRegistration}
      isPrivate
    />

    <Route path="/orcamentos" exact component={Budgets} isPrivate />
  </Switch>
);

export default Routes;
