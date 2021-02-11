import {
  faPencilAlt,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Table from '~/components/global/Table';
import InputSearch from '~/components/global/InputSearch';

import {
  Wrapper,
  ButtonDelete,
  ButtonEdit,
  Header,
  Title,
  Functionalities,
  Input,
} from './styles';
import colors from '~/styles/colors';

const Budgets: React.FC = () => {
  function handleChangePage() {
    console.log('dado fixo table medicine');
  }

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Gerenciar Orçamentos</span>
        </Title>
        <Functionalities>
          <Input>
            <InputSearch icon={faSearch} placeholder="Buscar Por Orçamentos" />
          </Input>
        </Functionalities>
      </Header>
      <Table
        titles={['NOME', 'DATA', 'VALOR', 'STATUS', 'AÇÕES']}
        handleChangePage={handleChangePage}
        existData
        searching={false}
        loading={false}
        totalPages={1}
        currentPage={1}
      >
        <div>
          <span>Marcio Balian</span>
          <span>07/09/2020</span>
          <span>R$ 10,90</span>
          <span style={{ color: colors.yellow, fontWeight: 'bold' }}>
            PENDENTE
          </span>
          <div>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </div>
        </div>
        <div>
          <span>Luiz Fellipe</span>
          <span>07/09/2020</span>
          <span>R$ 10,90</span>
          <span style={{ color: colors.primary, fontWeight: 'bold' }}>
            FINALIZADO
          </span>
          <div>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </div>
        </div>
      </Table>
    </Wrapper>
  );
};

export default Budgets;
