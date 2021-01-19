import React, { useCallback, useRef, useState, useEffect } from 'react';
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
import { useHistory, Link } from 'react-router-dom';
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
import ButtonLink from '~/components/global/ButtonLink';
import ButtonSecondary from '~/components/global/ButtonSecondary';
import ContainerWithBordes from '~/components/ContainerWithBordes';
import api from '~/services/api';
import Input from '~/components/Input';
import AsyncSelect from '~/components/global/Selects/AsyncSelect';
import { useAuth } from '~/context/AuthContext';
import { useToast } from '~/context/ToastContext';
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
  const history = useHistory();
  const { pharmacie }: { pharmacie: any } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingEmplPos, setLoadingEmplPos] = useState(false);
  const [employeePositions, setEmployeePositions] = useState<[{}]>([{}]);
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

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
        await api.post('/employees/create', {
          ...data,
          pharmacie_id: pharmacie.id,
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar usuário',
          description: 'Usuário cadastrado com sucesso',
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
    [pharmacie, history, addToast],
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

        const options = data.map(({ id, name }: EmployeePositionProps) => ({
          value: id,
          label: name,
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
    loadEmployeePositions();
  }, [loadEmployeePositions]);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Cadastro De Funcionário</span>
          </Title>
          <Link to="/funcionarios" style={{ textDecoration: 'none' }}>
            <ButtonBackAndSave>
              <ButtonLink
                className="primary"
                to="/funcionarios"
                icon={faArrowLeft}
              >
                <span>Voltar</span>
              </ButtonLink>
            </ButtonBackAndSave>
          </Link>
        </HeaderModal>
      </Wrapper>
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="42"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                name="name"
                icon={faUser}
                placeholder="Nome do funcionário"
              />
              <Input name="email" icon={faEnvelope} placeholder="E-mail" />
              {/* <Input name="office" icon={faBriefcase} placeholder="Cargo" /> */}
            </InputGroup>
            <InputGroup>
              <Input name="phone" icon={faPhone} placeholder="Telefone" />
              <AsyncSelect
                isLoading={loadingEmplPos}
                placeholder="Cargo"
                defaultOptions={employeePositions}
                loadOptions={loadEmployeePositions}
                fieldName="employee_position_id"
                name="employee_position_id"
              />
            </InputGroup>
            <InputGroup>
              <Input
                name="password"
                type="password"
                icon={faLock}
                placeholder="Senha"
              />
              <Input
                name="confirmPassword"
                type="password"
                icon={faLock}
                placeholder="Confirmar Senha"
              />
            </InputGroup>

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

export default EmployeeRegistration;
