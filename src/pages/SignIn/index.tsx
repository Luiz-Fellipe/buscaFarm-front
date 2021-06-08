import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';

import getValidationErrors from '../../utils/getValidationsErrors';
import LogoBF from '~/assets/images/Logo.svg';
import PictureLogin from '~/assets/images/picture-login.svg';

import { ButtonPrimary } from '~/components/Button/styles';

import { useAuth } from '~/context/AuthContext';
import { useToast } from '~/context/ToastContext';

import {
  Logo,
  FormLogin,
  Wrapper,
  DivLeft,
  DivRight,
  InputEmail,
  InputPassword,
} from './styles';

interface Request {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleLoading = useCallback(value => {
    setLoading(value);
  }, []);

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
        handleLoading(true);
        await signIn({ email: data.email, password: data.password });

        handleLoading(false);
      } catch (err) {
        handleLoading(false);
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
    [signIn, addToast, handleLoading],
  );

  return (
    <Wrapper>
      <DivLeft>
        <Logo>
          <img src={LogoBF} alt="" />
        </Logo>

        <FormLogin ref={formRef} onSubmit={handleSubmit}>
          <InputEmail
            name="email"
            type="email"
            icon={faUser}
            placeholder="Usuário"
          />

          <InputPassword
            name="password"
            type="password"
            icon={faLock}
            placeholder="Senha"
          />

          {/* <Link to="/">esqueceu sua senha?</Link> */}

          <ButtonPrimary type="submit">
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <span>Entrar</span>
            )}
          </ButtonPrimary>
        </FormLogin>
      </DivLeft>
      <DivRight>
        <img src={PictureLogin} alt="" />
      </DivRight>
    </Wrapper>
  );
};
export default SignIn;
