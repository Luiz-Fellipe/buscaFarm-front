import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faPlusCircle,
  faSearch,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import exclamationSvg from '~/assets/icons/exclamation-mark.svg';
import tickSvg from '~/assets/icons/tick.svg';
import { useToast } from '~/context/ToastContext';

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
  id: string;
}
interface EmployeerProps {
  id: string;
  user: UserProps;
  employee_position: EmployeePositionProps;
}

interface PageProps {
  pageStart: number;
  searchValue: string;
}

const LIMIT_PER_PAGE = 7;

const EmployeesList: React.FC = () => {
  const [employeesOrganization, setEmployeesOrganization] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageState, setPageState] = useState<PageProps>({
    pageStart: 1,
    searchValue: '',
  });
  const { addToast } = useToast();
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
    }).then(async action => {
      if (action.value) {
        api
          .delete(`/employees/delete/${id}`)

          .then((res: any) => {
            if (res.status === 204) {
              setEmployeesOrganization(
                employeesOrganization.filter(
                  (employeer: EmployeerProps) => employeer.user.id !== id,
                ),
              );

              Swal.fire({
                title: 'Deletado!',
                text: 'Funcionário deletado com sucesso.',
                imageUrl: tickSvg,
                confirmButtonText: 'Ok',
                confirmButtonColor: `${colors.primary}`,
              });
            } else {
              AindaSwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Try again later...',
              });
            }
          })
          .catch(() => {
            AindaSwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong. Try again later...',
            });
          });
      }
    });
  }

  const loadEmployees = useCallback(async () => {
    try {
      const {
        data: { data, count },
      } = await api.get('/employees', {
        params: {
          pageStart: (pageState.pageStart - 1) * LIMIT_PER_PAGE,
          pageLength: LIMIT_PER_PAGE,
          search: pageState.searchValue,
        },
      });

      setTotalPage(Math.ceil(count / LIMIT_PER_PAGE));
      setEmployeesOrganization(data);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao carregar funcionários',
        description:
          'Não foi possivel carregar a lista de funcionários. tente novamente mais tarde',
      });
    }
  }, [addToast, pageState]);

  const handleChangePage = useCallback(currentPg => {
    setPageState(state => {
      return { ...state, pageStart: currentPg };
    });
  }, []);

  const handleSearchValue = useCallback(value => {
    setPageState({ pageStart: 1, searchValue: value });
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const debounced = useCallback(debounce(handleSearchValue, 600), []);

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
              onChange={e => debounced(e.target.value)}
              placeholder="Buscar Por Funcionários"
            />
          </Input>

          <ButtonAdd to="/funcionarios/cadastrar">
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>CADASTRAR</span>
          </ButtonAdd>
        </Functionalities>
      </Header>
      <Table
        titles={['NOME', 'EMAIL', 'CARGO', 'AÇÕES']}
        handleChangePage={handleChangePage}
        totalPages={totalPage}
        currentPage={pageState.pageStart}
      >
        {employeesOrganization.map((employee: EmployeerProps) => (
          <tr key={employee.id}>
            <td>{employee.user.name}</td>
            <td>{employee.user.email}</td>
            <td>{employee.employee_position.name}</td>
            <td>
              <ButtonEdit to={`funcionarios/editar/${employee.id}`}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonEdit>

              <ButtonDelete
                onClick={() => handleDelete(employee.user.id)}
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} />
              </ButtonDelete>
            </td>
          </tr>
        ))}
      </Table>
    </Wrapper>
  );
};

export default EmployeesList;
