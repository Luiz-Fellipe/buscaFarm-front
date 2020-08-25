import React, { useCallback, useRef } from 'react';

import {
  faArrowLeft,
  faCheck,
  faBriefcase,
  faUser,
  faEnvelope,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  InputGroup,
  Save,
} from './styles';
import ButtonPrimary from '~/components/global/ButtonPrimary';
import ButtonSecondary from '~/components/global/ButtonSecondary';
import ContainerWithBordes from '~/components/ContainerWithBordes';

import Input from '~/components/Input';
import getValidationErrors from '~/utils/getValidationsErrors';

const EmployeeRegistration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: Request) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do Funcionário Obrigatório'),
        office: Yup.string().required('Nome do Cargo Obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Senha de no mínimo 6 dígitos'),
        confirmPassword: Yup.string().required('Declarar senha novamente'),
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
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Cadastro De Funcionário</span>
          </Title>
          <ButtonBackAndSave>
            <ButtonPrimary icon={faArrowLeft}>
              <span>Voltar</span>
            </ButtonPrimary>
          </ButtonBackAndSave>
        </HeaderModal>
      </Wrapper>
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="43"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              icon={faUser}
              placeholder="Nome do funcionário"
            />
            <InputGroup>
              <Input name="email" icon={faEnvelope} placeholder="E-mail" />
              <Input name="office" icon={faBriefcase} placeholder="E-mail" />
              <Input name="password" icon={faLock} placeholder="Senha" />
              <Input
                name="confirmPassword"
                icon={faLock}
                placeholder="Confirmar Senha"
              />
            </InputGroup>
            <Save>
              <ButtonSecondary icon={faCheck}>
                <span>Salvar</span>
              </ButtonSecondary>
            </Save>
          </Form>
        </Container>
      </ContainerWithBordes>
    </>
  );
};

export default EmployeeRegistration;
