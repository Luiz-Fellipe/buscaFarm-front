import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  faArrowLeft,
  faCheck,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles, Scope } from '@unform/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  InputGroup,
  Save,
  Avatar,
  InputProfile,
} from './styles';
import ButtonLink from '~/components/global/ButtonLink';
import ButtonSecondary from '~/components/global/ButtonSecondary';
import ContainerWithBordes from '~/components/ContainerWithBordes';

import getValidationErrors from '~/utils/getValidationsErrors';
import api from '~/services/api';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/context/AuthContext';

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
  };
  password?: string;
  oldPassword?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [avatarExist, setAvatarExist] = useState(true);

  const { updateEmployee, employee } = useAuth();

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateEmployee(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, updateEmployee],
  );

  const handleSubmit = useCallback(
    async (data: DataProps) => {
      try {
        console.log('data', data);
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          user: Yup.object().shape({
            name: Yup.string().required('Nome do Funcionário Obrigatório'),
            phone: Yup.string(),
            email: Yup.string()
              .required('Email obrigatório')
              .email('Digite um e-mail válido'),
          }),

          password: Yup.string().min(
            8,
            'Password must be at least 8 characters',
          ),

          oldPassword: Yup.string().min(
            8,
            'Password must be at least 8 characters',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          user: { name, email, phone },
          password,
          oldPassword,
        } = data;

        await api.put('/employees/edit', {
          employee_id: id,
          name,
          email,
          phone,
          password,
          oldPassword,
        });

        updateEmployee({
          ...employee.user,
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
        console.log(err);
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
    [history, addToast, id, employee.user, updateEmployee],
  );

  const handleErrorImage = useCallback(() => {
    setAvatarExist(false);
  }, []);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Perfil</span>
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
        widthPercent="60"
        heightPercent="40"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <Avatar>
            {avatarExist ? (
              <img
                src={employee.user.avatar_url}
                alt=""
                onError={handleErrorImage}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} size="3x" />
            )}

            <label htmlFor="avatar">
              <FontAwesomeIcon icon={faCamera} />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </Avatar>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Scope path="user">
              <InputProfile
                name="name"
                icon={faUser}
                placeholder="Nome"
                defaultValue={employee.user.name}
              />
            </Scope>
            <InputGroup>
              <fieldset>
                <Scope path="user">
                  <InputProfile
                    name="email"
                    icon={faEnvelope}
                    placeholder="E-mail"
                    defaultValue={employee.user.email}
                  />
                </Scope>
              </fieldset>
              <Scope path="user">
                <fieldset>
                  <InputProfile
                    name="phone"
                    icon={faPhone}
                    placeholder="Telefone"
                    defaultValue={employee.user.phone}
                  />
                </fieldset>
              </Scope>
            </InputGroup>
            <InputGroup>
              <fieldset>
                <InputProfile
                  name="oldPassword"
                  icon={faLock}
                  placeholder="Senha Antiga"
                  type="password"
                />
              </fieldset>
              <fieldset>
                <InputProfile
                  name="password"
                  icon={faLock}
                  placeholder="Senha"
                  type="password"
                />
              </fieldset>
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

export default Profile;
