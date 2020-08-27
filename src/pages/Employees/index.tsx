import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faSearch,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import exclamationSvg from '~/assets/icons/exclamation-mark.svg';
import tickSvg from '~/assets/icons/tick.svg';

import {
  Wrapper,
  Header,
  Title,
  Functionalities,
  ButtonAdd,
  Input,
  ButtonEdit,
  ButtonDelete,
} from './styles';

import Table from '~/components/global/Table';
import InputSearch from '~/components/global/InputSearch';
import colors from '~/styles/colors';
import { AindaSwal } from '~/components/global/AindaSwal';

const Employees: React.FC = () => {
  function handleDelete() {
    AindaSwal.fire({
      title: 'Tem certeza de que deseja excluir este funcionário?',
      text: 'Você não será capaz de reverter isso!',
      imageUrl: exclamationSvg,
      showCloseButton: true,
      confirmButtonColor: `${colors.primary}`,
      confirmButtonText: 'Sim, Deletar!',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      focusCancel: false,
      reverseButtons: true,
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Deletado!',
          text: 'Funcionário deletado com sucesso.',
          imageUrl: tickSvg,
          confirmButtonText: 'Ok',
          confirmButtonColor: `${colors.primary}`,
        });
      }
    });
  }

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Gerenciar Funcionários</span>
        </Title>
        <Functionalities>
          <Input>
            <InputSearch
              icon={faSearch}
              placeholder="Buscar Por Funcionários"
            />
          </Input>
          <a href="/cadastro-de-funcionarios">
            <ButtonAdd>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>CADASTRAR</span>
            </ButtonAdd>
          </a>
        </Functionalities>
      </Header>
      <Table titles={['NOME', 'EMAIL', 'CARGO', 'AÇÕES']}>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
          <td>
            <ButtonEdit type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>
            <ButtonDelete type="button">
              <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
            </ButtonDelete>
          </td>
        </tr>
        <tr>
          <td>Samuel Xavier</td>
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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
          <td>samuelxavier@gmail.com</td>
          <td>Vendedor</td>
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

export default Employees;
