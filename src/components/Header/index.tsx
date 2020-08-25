import React from 'react';

import { NavLink } from 'react-router-dom';
import LogoBF from '~/assets/images/Logo.png';
import User from '~/assets/images/ImageProfile.png';
import Notifications from '~/assets/images/IconNotifications.png';
import Logout from '~/assets/images/IconLogout.png';
import { useAuth } from '~/context/AuthContext';

import {
  HeaderApplication,
  Logo,
  Navigation,
  NameProfile,
  NotificationsAndLogout,
} from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();
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
          <h5>Luiz Fellipe Da Silva</h5>
          <span>Administrador</span>
        </div>
        <div>
          <img src={User} alt="" />
        </div>
      </NameProfile>
      <NotificationsAndLogout>
        <img src={Notifications} alt="" />
        <button type="button" onClick={signOut}>
          <img src={Logout} alt="" />
        </button>
      </NotificationsAndLogout>
    </HeaderApplication>
  );
};

export default Header;
