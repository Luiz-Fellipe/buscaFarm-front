import React, { useCallback, useRef, useEffect, useState } from 'react';

import {
  faArrowLeft,
  faCheck,
  faUser,
  faEnvelope,
  faLock,
  faPhone,
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
import api from '~/services/api';
import Input from '~/components/Input';
import AsyncSelect from '~/components/global/AsyncSelect';

import getValidationErrors from '~/utils/getValidationsErrors';

interface EmployeePositionProps {
  id?: string;
  name?: string;
}

interface OptionsProps {
  value: EmployeePositionProps;
  label: EmployeePositionProps;
}

const EmployeeRegistration: React.FC = () => {
  const [employeePositions, setEmployeePositions] = useState<[]>([]);

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
        telephone: Yup.string().required('Informar número de usuário'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  const loadEmployeePositions = useCallback(async () => {
    try {
      const {
        data: { employeesPosition },
      } = await api.get('/employees/position');

      const options = employeesPosition.map(
        ({ id, name }: EmployeePositionProps) => ({
          value: id,
          label: name,
        }),
      );

      setEmployeePositions(options);
    } catch {}
  }, []);

  useEffect(() => {
    loadEmployeePositions();
  }, [loadEmployeePositions]);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Cadastro De Funcionário</span>
          </Title>
          <a href="/funcionarios" style={{ textDecoration: 'none' }}>
            <ButtonBackAndSave>
              <ButtonPrimary icon={faArrowLeft}>
                <span>Voltar</span>
              </ButtonPrimary>
            </ButtonBackAndSave>
          </a>
        </HeaderModal>
      </Wrapper>
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="54"
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
              {/* <Input name="office" icon={faBriefcase} placeholder="Cargo" /> */}
              <AsyncSelect
                // defaultValue={employeePositions[0]}
                isSearchable
                name="employees-position"
                options={employeePositions}
                loadOptions={loadEmployeePositions}
              />
              <Input name="password" icon={faLock} placeholder="Senha" />
              <Input
                name="confirmPassword"
                icon={faLock}
                placeholder="Confirmar Senha"
              />
            </InputGroup>
            <Input name="telephone" icon={faPhone} placeholder="Telefone" />
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
