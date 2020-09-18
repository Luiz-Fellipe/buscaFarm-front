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
        totalPages={1}
        currentPage={1}
      >
        <tr>
          <td>Marcio Balian</td>
          <td>07/09/2020</td>
          <td>R$ 10,90</td>
          <td style={{ color: colors.yellow, fontWeight: 'bold' }}>PENDENTE</td>
          <td>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </td>
        </tr>
        <tr>
          <td>Luiz Fellipe</td>
          <td>17/09/2020</td>
          <td>R$ 10,90</td>

          <td style={{ color: colors.red, fontWeight: 'bold' }}>CANCELADO</td>

          <td>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </td>
        </tr>
        <tr>
          <td>Lucas Dallier Arraes</td>
          <td>05/09/2020</td>
          <td>R$ 10,90</td>

          <td style={{ color: colors.primary, fontWeight: 'bold' }}>
            FINALIZADO
          </td>

          <td>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>10/09/2019</td>
          <td>R$ 10,90</td>

          <td style={{ color: colors.primary, fontWeight: 'bold' }}>
            FINALIZADO
          </td>

          <td>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>

            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} />
            </ButtonDelete>
          </td>
        </tr>
      </Table>
    </Wrapper>
  );
};

export default Budgets;
