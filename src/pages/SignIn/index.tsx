import React, { useCallback, useRef } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationsErrors';
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
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Request) => {
    console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        user: Yup.string().required('Usuário obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha de no mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <User>
            <Input name="user" icon={FiUser} placeholder="Usuário" />
          </User>
          <Password>
            <Input name="password" icon={FiLock} placeholder="Senha" />
          </Password>
          <Forgot>
            <span>esqueceu sua senha?</span>
          </Forgot>
          <Login>
            <ButtonPrimary type="submit">
              <span>Entrar</span>
            </ButtonPrimary>
          </Login>
        </Form>
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
