import React from 'react';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import LogoBF from '~/assets/images/Logo.svg';
import User from '~/assets/images/ImageProfile.png';

import { useAuth } from '~/context/AuthContext';

import {
  HeaderApplication,
  Logo,
  Navigation,
  NameProfile,
  NotificationsAndLogout,
} from './styles';

const Header: React.FC = () => {
  const { signOut, employee } = useAuth();
  return (
    <HeaderApplication>
      <Logo>
        <NavLink to="/login">
          <img src={LogoBF} alt="" />
        </NavLink>
      </Logo>
      <Navigation>
        <NavLink to="/medicamentos" className="Active">
          MEDICAMENTOS
        </NavLink>
        <NavLink to="/funcionarios">FUNCIONÁRIOS</NavLink>
        <NavLink to="/orcamentos">ORÇAMENTOS</NavLink>
      </Navigation>
      <NameProfile>
        <div>
          <h5>{employee.user.name}</h5>
          <span>{employee.employee_position.name}</span>
        </div>
        <div>
          <img src={User} alt="" />
        </div>
      </NameProfile>
      <NotificationsAndLogout>
        <button type="button">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button type="button" onClick={signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </NotificationsAndLogout>
    </HeaderApplication>
  );
};

export default Header;
