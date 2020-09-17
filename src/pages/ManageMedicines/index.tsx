import {
  faPencilAlt,
  faPlusCircle,
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
  ButtonAdd,
} from './styles';

const ManageMedicines: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Gerenciar Medicamentos</span>
        </Title>
        <Functionalities>
          <Input>
            <InputSearch
              icon={faSearch}
              placeholder="Buscar Por Medicamentos"
            />
          </Input>
          <a href="/cadastro-de-medicamentos">
            <ButtonAdd>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>CADASTRAR</span>
            </ButtonAdd>
          </a>
        </Functionalities>
      </Header>
      <Table titles={['NOME', 'FABRICANTE', 'PREÇO', 'QUANTIDADE', 'AÇÕES']}>
        <tr>
          <td>Dipirona</td>
          <td>Neo Quimica</td>
          <td>R$ 10,90</td>
          <td>1</td>
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
          <td>Dipirona</td>
          <td>Neo Quimica</td>
          <td>R$ 10,90</td>

          <td>1</td>

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
          <td>Dipirona</td>
          <td>Neo Quimica</td>
          <td>R$ 10,90</td>

          <td>1</td>

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
          <td>Dipirosfsdfsdfsdsdfsdfna</td>
          <td>Neo Quimica</td>
          <td>R$ 10,90</td>

          <td>1</td>

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

export default ManageMedicines;
