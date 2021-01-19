import React, { useCallback, useRef, useState } from 'react';

import {
  faArrowLeft,
  faCheck,
  faPills,
  faSortAmountUpAlt,
  faDollarSign,
  faIndustry,
} from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
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
import { useAuth } from '~/context/AuthContext';
import { useToast } from '~/context/ToastContext';
import api from '~/services/api';
import getValidationErrors from '~/utils/getValidationsErrors';

interface EmployeePositionProps {
  id?: string;
  name?: string;
}

interface OptionsProps {
  value: EmployeePositionProps;
  label: EmployeePositionProps;
}

const MedicineRegistration: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { pharmacie }: { pharmacie: any } = useAuth();
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: Request) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do Medicamento Obrigatório'),
          manufacturer: Yup.string().required('Nome do Fabricante Obrigatório'),
          amount: Yup.number()
            .required('Quantidade obrigatória')
            .min(0, 'A quantidade minima é 0'),
          price: Yup.number()
            .required('Preço Obrigatório')
            .min(0, 'O preço minimo é 0'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);
        await api.post('/medicines/create', {
          ...data,
          pharmacie_id: pharmacie.id,
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao cadastrar o medicamento',
          description: 'Medicamento cadastrado com sucesso',
        });

        setLoading(false);
        history.push('/medicamentos');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar medicamento',
          description:
            'Não foi possivel cadastrar o medicamento. tente novamente mais tarde',
        });
      }
    },
    [pharmacie, history, addToast],
  );

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Cadastro De Medicamentos</span>
          </Title>

          <ButtonBackAndSave>
            <ButtonLink
              className="primary"
              to="/medicamentos"
              icon={faArrowLeft}
            >
              <span>Voltar</span>
            </ButtonLink>
          </ButtonBackAndSave>
        </HeaderModal>
      </Wrapper>
      <ContainerWithBordes
        widthPercent="70"
        heightPercent="33"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                name="name"
                icon={faPills}
                placeholder="Nome do Medicamento"
              />
              <Input
                name="manufacturer"
                icon={faIndustry}
                placeholder="Nome do Fabricante"
              />
            </InputGroup>
            <InputGroup>
              <Input
                name="amount"
                icon={faSortAmountUpAlt}
                placeholder="Quantidade do Medicamento"
              />
              {/* <Input name="office" icon={faBriefcase} placeholder="Cargo" /> */}

              <Input
                name="price"
                icon={faDollarSign}
                placeholder="Preço do medicamento"
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

export default MedicineRegistration;
