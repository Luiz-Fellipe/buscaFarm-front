import React, { useCallback, useEffect } from 'react';

import {
  faArrowLeft,
  faUser,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Scope } from '@unform/core';
import { useParams } from 'react-router-dom';
import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  InputGroup,
} from './styles';
import ButtonLink from '~/components/global/ButtonLink';

import ContainerWithBordes from '~/components/ContainerWithBordes';

import Input from '~/components/Input';
import api from '~/services/api';
import { useToast } from '~/context/ToastContext';

interface BudgetsProps {
  user: {
    name: string;
  };
  id: string;
  created_at: string;
  value: string;
}

const BudgetsView: React.FC = () => {
  const { addToast } = useToast();
  const { id } = useParams<{ id: string }>();

  const getBudgets = useCallback(async () => {
    try {
      const response = await api.get(`/budgets/${id}`);

      console.log('data', response);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao trazer dados do usuário',
        description: 'Ocorreu um erro ao buscar os dados do usuário.',
      });
    }
  }, [id, addToast]);

  useEffect(() => {
    console.log('id', id);

    getBudgets();
  }, [getBudgets, id]);

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
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="35"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <InputGroup />
        </Container>
      </ContainerWithBordes>
    </>
  );
};

export default BudgetsView;
