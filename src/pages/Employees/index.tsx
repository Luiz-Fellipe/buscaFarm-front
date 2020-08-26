import React from 'react';

import { Wrapper } from './styles';

import Table from '~/components/global/Table';

const Employees: React.FC = () => {
  return (
    <Wrapper>
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
