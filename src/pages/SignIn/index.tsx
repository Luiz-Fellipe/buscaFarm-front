import React from 'react';

import LogoBF from '~/assets/images/Logo.png';
import UserGreen from '~/assets/images/IconUserGreen.png';
import LockGreen from '~/assets/images/IconLockGreen.png';

import {
  Container,
  Content,
  Logo,
  User,
  Password,
  Forgot,
  Login,
  ArrowLeftTop,
  ArrowRightBottom,
} from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <ArrowLeftTop>
        <div className="setup">
          <span className="button">
            <span className="head" />
          </span>
        </div>
      </ArrowLeftTop>
      <Content>
        <Logo>
          <img src={LogoBF} alt="" />
        </Logo>
        <User>
          <div>
            <img src={UserGreen} alt="" />
          </div>
          <input placeholder="Usuário" />
        </User>
        <Password>
          <div>
            <img src={LockGreen} alt="" />
          </div>
          <input placeholder="Senha" />
        </Password>
        <Forgot>
          <span>esqueceu sua senha?</span>
        </Forgot>
        <Login>
          <button type="button">
            <span>Entrar</span>
          </button>
        </Login>
      </Content>
      <ArrowRightBottom>
        <div className="setup-two">
          <span className="button-two">
            <span className="head-two" />
          </span>
        </div>
      </ArrowRightBottom>
    </Container>
  );
};

export default SignIn;
