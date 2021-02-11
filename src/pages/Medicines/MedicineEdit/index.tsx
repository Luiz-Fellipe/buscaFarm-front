import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Wrapper,
  HeaderModal,
  Title,
  ButtonBackAndSave,
  Container,
  InputGroup,
  Save,
  ContainerLoading,
} from './styles';
import ButtonLink from '~/components/global/ButtonLink';
import ButtonSecondary from '~/components/global/ButtonSecondary';
import ContainerWithBordes from '~/components/ContainerWithBordes';
import Input from '~/components/Input';
import api from '~/services/api';
import { useToast } from '~/context/ToastContext';
import getValidationErrors from '~/utils/getValidationsErrors';
import BoxLoading from '~/components/global/BoxLoading';

interface EmployeePositionProps {
  id?: string;
  name?: string;
}

interface OptionsProps {
  value: EmployeePositionProps;
  label: EmployeePositionProps;
}

const MedicineEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { id } = useParams<{ id: string }>();

  const { addToast } = useToast();
  const history = useHistory();

  const [medicineEdit, setMedicineEdit] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleSubmit = useCallback(
    async ({ amount, price }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          amount: Yup.number()
            .required('Quantidade obrigatória')
            .min(0, 'A quantidade minima é 0'),
          price: Yup.number()
            .required('Preço Obrigatório')
            .min(0, 'O preço minimo é 0'),
        });

        await schema.validate(
          { amount, price },
          {
            abortEarly: false,
          },
        );

        setLoading(true);

        await api.put('/pharmacies/medicines/edit', {
          amount,
          price,
          medicine_id: id,
        });

        addToast({
          type: 'success',
          title: 'Sucesso ao editar o medicamento',
          description: 'Medicamento editado com sucesso',
        });

        setLoading(false);
        history.push('/medicamentos');
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false);
        addToast({
          type: 'error',
          title: 'Erro ao editar medicamento',
          description:
            'Não foi possivel editar o medicamento. tente novamente mais tarde',
        });
      }
    },
    [id, history, addToast],
  );

  const getMedicine = useCallback(async () => {
    try {
      setLoadingData(true);
      const {
        data: {
          medicine: { name, manufacturer },
          amount,
          price,
        },
      } = await api.get(`pharmacies/medicines/${id}`);

      setMedicineEdit({
        name,
        manufacturer,
        amount,
        price,
      });
      setLoadingData(false);
    } catch {
      setLoadingData(false);
      addToast({
        type: 'error',
        title: 'Erro ao trazer dados do medicamento',
        description: 'Ocorreu um erro ao buscar os dados do medicamento',
      });
      history.push('/medicamentos');
    }
  }, [id, addToast, history]);

  useEffect(() => {
    getMedicine();
  }, [getMedicine]);

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Editar Medicamentos</span>
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
          {!loadingData ? (
            <Form
              ref={formRef}
              initialData={medicineEdit}
              onSubmit={handleSubmit}
            >
              <InputGroup>
                <Input
                  name="name"
                  icon={faPills}
                  disabled
                  placeholder="Nome do Medicamento"
                />
                <Input
                  name="manufacturer"
                  disabled
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
          ) : (
            <ContainerLoading>
              <BoxLoading loading />
            </ContainerLoading>
          )}
        </Container>
      </ContainerWithBordes>
    </>
  );
};

export default MedicineEdit;
