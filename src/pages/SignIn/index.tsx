import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';

import getValidationErrors from '../../utils/getValidationsErrors';
import LogoBF from '~/assets/images/Logo.png';
import { Container, Logo, FormLogin, Wrapper } from './styles';
import Input from '~/components/Input';
import { ButtonPrimary } from '~/components/Button/styles';
import ContainerWithBordes from '~/components/ContainerWithBordes';

import { useAuth } from '~/context/AuthContext';
import { useToast } from '~/hooks/toast';

interface Request {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, loading } = useAuth();
  const { addToast } = useToast();

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

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <Wrapper>
      <ContainerWithBordes
        widthPercent="30"
        heightPercent="60"
        borderHeightPx="100"
        borderWidthPx="13"
      >
        <Container>
          <Logo>
            <img src={LogoBF} alt="" />
          </Logo>

          <FormLogin ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="email"
              type="email"
              icon={faUser}
              placeholder="Usuário"
            />

            <Input
              name="password"
              type="password"
              icon={faLock}
              placeholder="Senha"
            />

            <Link to="/">esqueceu sua senha?</Link>

            <ButtonPrimary type="submit">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <span>Entrar</span>
              )}
            </ButtonPrimary>
          </FormLogin>
        </Container>
      </ContainerWithBordes>
    </Wrapper>
  );
};
export default SignIn;
