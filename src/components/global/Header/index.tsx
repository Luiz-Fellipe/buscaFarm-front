import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import LogoHorizontal from '~/assets/images/BuscaFarmLogoHorizontal.svg';

import { useAuth } from '~/context/AuthContext';
/* */

import {
  HeaderApplication,
  Logo,
  Navigation,
  Profile,
  NotificationsAndLogout,
} from './styles';

const Header: React.FC = () => {
  const { signOut, employee } = useAuth();

  const [noAvatarImage, setNoAvatarImage] = useState(false);

  return (
    <HeaderApplication>
      <Logo>
        <NavLink to="/medicamentos">
          <img src={LogoHorizontal} alt="" />
        </NavLink>
      </Logo>
      <Navigation>
        <NavLink to="/medicamentos" className="Active">
          MEDICAMENTOS
        </NavLink>
        <NavLink to="/funcionarios">FUNCIONÁRIOS</NavLink>
        <NavLink to="/orcamentos">ORÇAMENTOS</NavLink>
      </Navigation>
      <Profile href="perfil">
        <div>
          <h5>{employee.user.name}</h5>
          <span>{employee.employee_position.name}</span>
        </div>
        <div>
          {noAvatarImage ? (
            <div className="no-avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
          ) : (
            <img
              src={employee.user.avatar_url || ''}
              onError={() => setNoAvatarImage(true)}
              alt=""
            />
          )}
        </div>
      </Profile>
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
