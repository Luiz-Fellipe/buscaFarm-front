import {
  faPencilAlt,
  faPlusCircle,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
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

const MedicineList: React.FC = () => {
  function handleChangePage() {
    console.log('dado fixo table medicine');
  }

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
          <Link to="/medicamentos/cadastrar">
            <ButtonAdd>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>CADASTRAR</span>
            </ButtonAdd>
          </Link>
        </Functionalities>
      </Header>
      <Table
        titles={['NOME', 'FABRICANTE', 'PREÇO', 'QUANTIDADE', 'AÇÕES']}
        handleChangePage={handleChangePage}
        totalPages={1}
        currentPage={1}
      >
        <tr>
          <td>Dipirona</td>
          <td>Neo Quimica</td>
          <td>R$ 10,90</td>
          <td>1</td>
          <td>
            <ButtonEdit type="button" to="/medicamentos/editar">
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
            <ButtonEdit type="button" to="/medicamentos/editar">
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
            <ButtonEdit type="button" to="/medicamentos/editar">
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
            <ButtonEdit type="button" to="/medicamentos/editar">
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

export default MedicineList;
