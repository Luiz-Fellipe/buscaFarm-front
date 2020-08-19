import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import LogoBF from '~/assets/images/Logo.png';

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
import Input from '~/components/Input';
import { ButtonPrimary } from '~/components/Button/styles';

interface Request {
  user: string;
  password: string;
}

const SignIn: React.FC = () => {
  function handleSubmit(data: Request): void {
    console.log(data);
  }

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
        <Form onSubmit={handleSubmit}>
          <User>
            <Input name="user" icon={FiMail} placeholder="Usuário" />
          </User>
          <Password>
            <Input name="password" icon={FiLock} placeholder="Senha" />
          </Password>
          <Login>
            <ButtonPrimary type="submit">
              <span>Entrar</span>
            </ButtonPrimary>
          </Login>
        </Form>

        <Forgot>
          <span>esqueceu sua senha?</span>
        </Forgot>
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
