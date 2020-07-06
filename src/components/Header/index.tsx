import React from 'react';

import LogoBF from '~/assets/images/Logo.png';
import User from '~/assets/images/ImageProfile.png';
import Notifications from '~/assets/images/IconNotifications.png';
import Logout from '~/assets/images/IconLogout.png';

import {
  HeaderApplication,
  Logo,
  Navigation,
  NameProfile,
  NotificationsAndLogout,
} from './styles';

const Header: React.FC = () => {
  return (
    <HeaderApplication>
      <Logo>
        <img src={LogoBF} alt="" />
      </Logo>
      <Navigation>
        <h5 className="Active">MEDICAMENTOS</h5>
        <span>FUNCIONÁRIOS</span>
        <span>ORÇAMENTOS</span>
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
        <img src={Logout} alt="" />
      </NotificationsAndLogout>
    </HeaderApplication>
  );
};

export default Header;
