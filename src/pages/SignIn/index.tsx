import React, { useCallback, useRef } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationsErrors';
import LogoBF from '~/assets/images/Logo.png';
import { Container, Logo, FormLogin, Wrapper } from './styles';
import Input from '~/components/Input';
import { ButtonPrimary } from '~/components/Button/styles';
import ContainerWithBordes from '~/components/ContainerWithBordes';

import { useAuth } from '~/context/AuthContext';

interface Request {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: Request) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha de no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({ email: data.email, password: data.password });
        history.push('/medicamentos');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn, history],
  );

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

          <FormLogin ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              icon={FiUser}
              placeholder="Usuário"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />
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
