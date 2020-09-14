import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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

import Input from '~/components/Input';
import getValidationErrors from '~/utils/getValidationsErrors';
import api from '~/services/api';
import { useToast } from '~/hooks/toast';
import SimpleSelect from '~/components/global/SimpleSelect';

interface EmployeePositionProps {
  id?: string;
  name?: string;
}
interface OptionsProps {
  value: EmployeePositionProps;
  label: EmployeePositionProps;
}

const EmployeeEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams();
  const [employeeEdit, setEmployeeEdit] = useState<object>({});
  const history = useHistory();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [employeePositions, setEmployeePositions] = useState<[{}]>([{}]);

  const getEmployee = useCallback(async () => {
    try {
      const {
        data: {
          user: { name, email, phone },
          employee_position_id,
        },
      } = await api.get(`/employees/${id}`);
      setEmployeeEdit({
        name,
        email,
        phone,
        employee_position_id,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao trazer dados do usuário',
        description: 'Ocorreu um erro ao buscar os dados do usuário.',
      });
    }
  }, [id, addToast]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  const handleSubmit = useCallback(
    async (data: Request) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do Funcionário Obrigatório'),
          employee_position_id: Yup.string().required(
            'Nome do Cargo Obrigatório',
          ),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha de no mínimo 6 dígitos'),
          confirmPassword: Yup.string()
            .required('O Confirmar senha é obrigatório')
            .oneOf([Yup.ref('password')], 'As senhas não batem'),
          phone: Yup.string().required('Informar número de usuário'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        // await api.put('/employees/edit', {
        //   employee_id,
        //   employee_position_id,
        //   name,
        //   email,
        //   password,
        //   old_password,
        //   phone,
        // });

        addToast({
          type: 'success',
          title: 'Sucesso ao editar usuário',
          description: 'Usuário editado com sucesso',
        });

        setLoading(false);
        history.push('/funcionarios');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar usuário',
          description:
            'Não foi possivel cadastrar o funcionário. tente novamente mais tarde',
        });
      }
    },
    [history, addToast],
  );

  const loadEmployeePositions = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await api.get('/employees/position', {
        params: {
          pageStart: 0,
          pageLength: 30,
          search: '',
        },
      });

      console.log('data', data);
      const options = data.map(
        ({ id: idOptions, name }: EmployeePositionProps) => ({
          value: idOptions,
          label: name,
        }),
      );

      setEmployeePositions(options);
    } catch (e) {
      console.log(e);
      addToast({
        type: 'error',
        title: 'Erro ao buscar os cargos',
        description: 'Ocorreu um erro ao buscar os cargos.',
      });
    }
  }, [addToast]);

  useEffect(() => {
    loadEmployeePositions();
  }, [loadEmployeePositions]);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Editar Dados do Funcionário</span>
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
          <Form
            ref={formRef}
            initialData={employeeEdit}
            onSubmit={handleSubmit}
          >
            <Input
              name="name"
              icon={faUser}
              placeholder="Nome do funcionário"
            />
            <InputGroup>
              <Input name="email" icon={faEnvelope} placeholder="E-mail" />
              <SimpleSelect
                placeholder="Cargo"
                fieldName="employee_position_id"
                name="employee_position_id"
                options={employeePositions}
              />
              <Input name="password" icon={faLock} placeholder="Senha" />
              <Input
                name="confirmPassword"
                icon={faLock}
                placeholder="Confirmar Senha"
              />
            </InputGroup>
            <Input name="phone" icon={faPhone} placeholder="Telefone" />
            <Save>
              <ButtonSecondary icon={faCheck} loading={loading}>
                <span>Salvar</span>
              </ButtonSecondary>
            </Save>
          </Form>
        </Container>
      </ContainerWithBordes>
    </>
  );
};

export default EmployeeEdit;
