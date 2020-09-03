import React, { useCallback, useEffect, useState } from 'react';

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
import api from '~/services/api';
import { AindaSwal } from '~/components/global/AindaSwal';

interface EmployeePositionProps {
  name: string;
}
interface UserProps {
  name: string;
  email: string;
}
interface EmployeerProps {
  id: string;
  user: UserProps;
  employee_position: EmployeePositionProps;
}

const EmployeesList: React.FC = () => {
  const [employeesOrganization, setEmployeesOrganization] = useState<[]>([]);

  function handleDelete(id: string) {
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

  const loadEmployees = useCallback(async () => {
    try {
      const response = await api.get('/employees');
      setEmployeesOrganization(response.data.employees);
      console.log('salve', response.data.employees);
    } catch {}
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

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
        {employeesOrganization.map(
          ({ id, user, employee_position }: EmployeerProps) => (
            <tr key={id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{employee_position.name}</td>
              <ButtonEdit type="button">
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonEdit>
              <ButtonDelete type="button">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(id)}
                />
              </ButtonDelete>
            </tr>
          ),
        )}
      </Table>
    </Wrapper>
  );
};

export default EmployeesList;
