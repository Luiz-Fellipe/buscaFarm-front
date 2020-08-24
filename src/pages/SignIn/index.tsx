import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LogoBF from '~/assets/images/Logo.png';

import { Container, Logo, FormLogin, Wrapper } from './styles';
import Input from '~/components/Input';
import { ButtonPrimary } from '~/components/Button/styles';
import ContainerWithBordes from '~/components/ContainerWithBordes';

interface Request {
  user: string;
  password: string;
}

const SignIn: React.FC = () => {
  function handleSubmit(data: Request): void {
    console.log(data);
  }

  return (
    <Wrapper>
      <ContainerWithBordes
        widthPercent="30"
        heightPercent="60"
        borderHeightPx="100"
        borderWidthPx="7"
      >
        <Container>
          <Logo>
            <img src={LogoBF} alt="" />
          </Logo>

          <FormLogin onSubmit={handleSubmit}>
            <Input name="user" icon={FiMail} placeholder="Usuário" />

            <Input name="password" icon={FiLock} placeholder="Senha" />
            <Link to="/">esqueceu sua senha?</Link>

            <ButtonPrimary type="submit">
              <span>Entrar</span>
            </ButtonPrimary>
          </FormLogin>
        </Container>
      </ContainerWithBordes>
    </Wrapper>
  );
};
export default SignIn;
