import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import MedicinesList from '~/pages/Medicines/MedicinesList';
import EmployeesList from '~/pages/Employees/EmployeesList';
import Budgets from '~/pages/Budgets';
import EmployeeRegistration from '~/pages/Employees/EmployeeRegistration';
import EmployeeEdit from '~/pages/Employees/EmployeeEdit';
import MedicineRegistration from '~/pages/Medicines/MedicineRegistration';
import MedicineEdit from '~/pages/Medicines/MedicineEdit';
import Profile from '~/pages/Profile';
import MedicineImport from '~/pages/Medicines/MedicineImport';
import BudgetsView from '~/pages/Budgets/BudgetsView';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/medicamentos" exact component={MedicinesList} isPrivate />
    <Route
      path="/medicamentos/cadastrar"
      exact
      component={MedicineRegistration}
      isPrivate
    />
    <Route path="/medicamentos/importar" component={MedicineImport} isPrivate />

    <Route path="/medicamentos/editar/:id" component={MedicineEdit} isPrivate />
    <Route path="/perfil" component={Profile} isPrivate />

    <Route path="/funcionarios" exact component={EmployeesList} isPrivate />
    <Route path="/funcionarios/editar/:id" component={EmployeeEdit} isPrivate />
    <Route
      path="/funcionarios/cadastrar"
      component={EmployeeRegistration}
      isPrivate
    />

    <Route path="/orcamentos" exact component={Budgets} isPrivate />
    <Route path="/orcamentos/:id" component={BudgetsView} isPrivate />
  </Switch>
);

export default Routes;
