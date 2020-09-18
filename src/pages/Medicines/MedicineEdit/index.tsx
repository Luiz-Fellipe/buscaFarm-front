import React, { useRef } from 'react';
import {
  faArrowLeft,
  faCheck,
  faPills,
  faSortAmountUpAlt,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import { Link } from 'react-router-dom';
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

  function handleSubmit() {
    console.log('console cadastro de medicamentos');
  }

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Editar Medicamentos</span>
          </Title>
          <Link to="/funcionarios" style={{ textDecoration: 'none' }}>
            <ButtonBackAndSave>
              <ButtonLink
                className="primary"
                to="/medicamentos"
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
        heightPercent="33"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              icon={faPills}
              placeholder="Nome do Medicamento"
            />
            <InputGroup>
              <Input
                name="quantity"
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

export default MedicineEdit;
