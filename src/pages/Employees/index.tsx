import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, Header, Title, Functionalities, ButtonAdd } from './styles';

import Table from '~/components/global/Table';
import InputSearch from '~/components/global/InputSearch';

const Employees: React.FC = () => {
  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Gerenciar Funcionários</span>
        </Title>
        <Functionalities>
          <InputSearch icon={faSearch} placeholder="Buscar Por Funcionários" />
          <ButtonAdd>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Cadastrar</span>
          </ButtonAdd>
        </Functionalities>
      </Header>
      <Table titles={['NOME', 'EMAIL', 'CARGO', 'AÇÕES']}>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <button type="button">1</button>
            <button type="button">2</button>
            <button type="button">3</button>
          </td>
        </tr>
      </Table>
    </Wrapper>
  );
};

export default Employees;
