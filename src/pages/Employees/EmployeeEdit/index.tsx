import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  faArrowLeft,
  faCheck,
  faUser,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles, Scope } from '@unform/core';
import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  InputGroup,
  Save,
} from './styles';
import ButtonLink from '~/components/global/ButtonLink';
import ButtonSecondary from '~/components/global/ButtonSecondary';
import ContainerWithBordes from '~/components/ContainerWithBordes';

import Input from '~/components/Input';
import getValidationErrors from '~/utils/getValidationsErrors';
import api from '~/services/api';
import { useToast } from '~/context/ToastContext';
import AsyncSelect from '~/components/global/Selects/AsyncSelect';

interface EmployeePositionProps {
  id?: string;
  name?: string;
}

interface DataProps extends Request {
  employee_position_id: string;
  user: {
    name: string;
    email: string;
    phone: string;
    password?: string;
    confirmPassword?: string;
    oldPassword?: string;
  };
}

interface OptionsProps {
  value: EmployeePositionProps;
  label: EmployeePositionProps;
}

const EmployeeEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<{ id: string }>();
  const [employeeEdit, setEmployeeEdit] = useState<object>({});
  const history = useHistory();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingEmplPos, setLoadingEmplPos] = useState(false);

  const [employeePositions, setEmployeePositions] = useState<[{}]>([{}]);

  const getEmployee = useCallback(async () => {
    try {
      const {
        data: { employee },
      } = await api.get(`/employees/${id}`);

      setEmployeeEdit(employee);

      await formRef.current?.setFieldValue('employee_position_id', {
        label: employee.employee_position.name,
        value: employee.employee_position_id,
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao trazer dados do usuário',
        description: 'Ocorreu um erro ao buscar os dados do usuário.',
      });
    }
  }, [id, addToast]);

  const handleSubmit = useCallback(
    async (data: DataProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.object().shape({
            name: Yup.string().required('Nome do Funcionário Obrigatório'),
            phone: Yup.string(),
            email: Yup.string()
              .required('Email obrigatório')
              .email('Digite um e-mail válido'),
          }),

          employee_position_id: Yup.string().required(
            'Nome do Cargo Obrigatório',
          ),

          // password: Yup.string().test(
          //   'empty-check',
          //   'Password must be at least 8 characters',
          //   password => password?.length === 0,
          // ),

          // confirmPassword: Yup.string().oneOf(
          //   [Yup.ref('password')],
          //   'As senhas digitadas não coincidem',
          // ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        const {
          employee_position_id,
          user: { name, email, phone },
        } = data;

        await api.put('/employees/edit', {
          employee_id: id,
          employee_position_id,
          name,
          email,
          phone,
        });

        addToast({
          type: 'success',
          title: 'Sucesso !',
          description: 'Funcionário editado com sucesso',
        });

        setLoading(false);

        history.push('/funcionarios');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao editar funcionário',
          description:
            'Não foi possivel editar o funcionário. tente novamente mais tarde',
        });
      }
    },
    [history, addToast, id],
  );

  const loadEmployeePositions = useCallback(
    async (inputValue?: string, callback?: Function) => {
      try {
        setLoadingEmplPos(true);
        const {
          data: { data },
        } = await api.get('/employees/position', {
          params: {
            pageStart: 0,
            search: inputValue || '',
            pageLength: 10,
          },
        });

        const options = data.map((empl: EmployeePositionProps) => ({
          value: empl.id,
          label: empl.name,
        }));

        if (inputValue && callback) {
          callback(options);
        } else {
          setEmployeePositions(options);
        }
        setLoadingEmplPos(false);
      } catch (e) {
        setLoadingEmplPos(false);
        addToast({
          type: 'error',
          title: 'Erro ao buscar os cargos',
          description: 'Ocorreu um erro ao buscar os cargos.',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

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

          <ButtonBackAndSave>
            <ButtonLink
              className="primary"
              to="/funcionarios"
              icon={faArrowLeft}
            >
              <span>Voltar</span>
            </ButtonLink>
          </ButtonBackAndSave>
        </HeaderModal>
      </Wrapper>
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="35"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          {employeeEdit && (
            <Form
              ref={formRef}
              initialData={employeeEdit}
              onSubmit={handleSubmit}
            >
              <Scope path="user">
                <InputGroup>
                  <Input
                    name="name"
                    icon={faUser}
                    placeholder="Nome do funcionário"
                  />
                  <Input name="email" icon={faEnvelope} placeholder="E-mail" />
                </InputGroup>
              </Scope>
              <InputGroup>
                <Scope path="user">
                  <Input name="phone" icon={faPhone} placeholder="Telefone" />
                </Scope>

                <AsyncSelect
                  isLoading={loadingEmplPos}
                  placeholder="Cargo"
                  defaultOptions={employeePositions}
                  loadOptions={loadEmployeePositions}
                  fieldName="employee_position_id"
                  name="employee_position_id"
                />
              </InputGroup>

              <Save>
                <ButtonSecondary icon={faCheck} loading={loading}>
                  <span>Salvar</span>
                </ButtonSecondary>
              </Save>
            </Form>
          )}
        </Container>
      </ContainerWithBordes>
    </>
  );
};

export default EmployeeEdit;
