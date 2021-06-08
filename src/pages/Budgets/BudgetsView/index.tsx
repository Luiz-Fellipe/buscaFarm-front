import React, { useCallback, useEffect, useState } from 'react';

import {
  faArrowLeft,
  faEnvelope,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  Header,
  CreatedAt,
  UpdatedAt,
  BudgetsInfo,
  HeaderBudgets,
  GridListBudgets,
  Total,
  InfoUser,
  User,
  DataUser,
  InputGroup,
  PhoneNumber,
  ContainerList,
} from './styles';
import ButtonLink from '~/components/global/ButtonLink';

import ContainerWithBordes from '~/components/ContainerWithBordes';

import api from '~/services/api';
import { useToast } from '~/context/ToastContext';
import DivDisabledInfo from '~/components/DivDisabledInfo';

interface UserProps {
  avatar_url?: string;
  email?: string;
  name?: string;
  phone?: number;
}
interface MedicineProps {
  manufacturer?: string;
  name?: string;
  register?: string;
  updated_at?: string;
  image_url?: string;
}
interface BudgetsMedicinesProps {
  medicine?: MedicineProps;
  id: string;
}
interface BudgetsInfoProps {
  budgets_medicines?: BudgetsMedicinesProps[];
  medicine?: MedicineProps;
  price?: string;
  amount?: Number;
  user?: UserProps;
  created_at?: string;
  updated_at?: string;
  value?: string;
  id?: string;
}

const BudgetsView: React.FC = () => {
  const { addToast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [budgetsInfo, setBudgetsInfo] = useState<BudgetsInfoProps>({});
  const [avatarExist, setAvatarExist] = useState(true);

  const getBudgets = useCallback(async () => {
    try {
      const { data } = await api.get(`/budgets/${id}`);
      setBudgetsInfo(data);

      console.log('data', data);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao trazer dados do usuário',
        description: 'Ocorreu um erro ao buscar os dados do usuário.',
      });
    }
  }, [id, addToast]);

  useEffect(() => {
    getBudgets();
  }, [getBudgets, id]);

  const handleErrorImage = useCallback(() => {
    setAvatarExist(false);
  }, []);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Visualização do Orçamento</span>
          </Title>

          <ButtonBackAndSave>
            <ButtonLink className="primary" to="/orcamentos" icon={faArrowLeft}>
              <span>Voltar</span>
            </ButtonLink>
          </ButtonBackAndSave>
        </HeaderModal>
      </Wrapper>
      <div style={{ paddingBottom: '100px' }}>
        <ContainerWithBordes
          widthPercent="70"
          heightPercent="90"
          borderHeightPx="81"
          borderWidthPx="12"
        >
          <Container>
            <Header>
              <CreatedAt>
                <span className="title-header">Criado em: </span>
                <span id="created-at">
                  {moment(budgetsInfo.created_at).format('DD-MM-YYYY HH:mm:ss')}
                </span>
              </CreatedAt>
              <UpdatedAt>
                <span className="title-header">Última atualização em: </span>
                <span id="updated-at">
                  {moment(budgetsInfo.updated_at).format('DD-MM-YYYY HH:mm:ss')}
                </span>
              </UpdatedAt>
            </Header>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InfoUser>
                <User>
                  {!avatarExist ? (
                    <img
                      src={budgetsInfo?.user?.avatar_url}
                      alt=""
                      onError={handleErrorImage}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="3x" />
                  )}
                </User>

                <DataUser>
                  <InputGroup>
                    <DivDisabledInfo
                      icon={faUser}
                      placeholder="Nome do Cliente"
                    >
                      {budgetsInfo?.user?.name}
                    </DivDisabledInfo>
                    <DivDisabledInfo
                      icon={faEnvelope}
                      placeholder="Email do Cliente"
                    >
                      {budgetsInfo?.user?.email}
                    </DivDisabledInfo>
                  </InputGroup>
                  <PhoneNumber>
                    <DivDisabledInfo
                      style={{ width: '326.58px' }}
                      icon={faPhone}
                      placeholder="Email do Cliente"
                    >
                      {budgetsInfo?.user?.phone}
                    </DivDisabledInfo>
                  </PhoneNumber>
                </DataUser>
              </InfoUser>
            </div>

            <BudgetsInfo>
              <HeaderBudgets>
                <span>Nome do Medicamento</span>
                <span>Fabricante</span>
                <span>Registro</span>
                <span>Quantidade</span>
                <span>Preço</span>
              </HeaderBudgets>

              <ContainerList>
                {budgetsInfo.budgets_medicines &&
                  budgetsInfo.budgets_medicines.map((d: BudgetsInfoProps) => (
                    <GridListBudgets key={d.id}>
                      <span>{d?.medicine?.name}</span>
                      <span>{d?.medicine?.manufacturer}</span>
                      <span>{d?.medicine?.register}</span>
                      <span>{d?.amount}</span>
                      <span>
                        R$
                        {d?.price}
                      </span>
                    </GridListBudgets>
                  ))}
              </ContainerList>

              <Total>
                <span>Valor Total:</span>
                <span />
                <span />
                <span />
                <span id="value-total">
                  R$
                  {budgetsInfo.value}
                </span>
              </Total>
            </BudgetsInfo>
          </Container>
        </ContainerWithBordes>
      </div>
    </>
  );
};

export default BudgetsView;
