import React, { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
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
import { useAuth } from '~/context/AuthContext';

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
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [pageState, setPageState] = useState<PageProps>({
    pageStart: 1,
    searchValue: '',
  });
  const { addToast } = useToast();

  const { employee: employeeLogged } = useAuth();

  const searching: string | boolean =
    !loading && pageState.searchValue && !employeesOrganization.length;

  const existEmployees = !loading && !!employeesOrganization.length;

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
      setLoading(true);
      const {
        data: {
          employee: { data, count },
        },
      } = await api.get('/employees', {
        params: {
          pageStart: (pageState.pageStart - 1) * LIMIT_PER_PAGE,
          pageLength: LIMIT_PER_PAGE,
          search: pageState.searchValue,
        },
      });

      setTotalPage(Math.ceil(count / LIMIT_PER_PAGE));
      setEmployeesOrganization(data);
      setLoading(false);
    } catch {
      setLoading(false);
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
        searching={searching}
        existData={existEmployees}
        loading={loading}
      >
        {employeesOrganization.map((employee: EmployeerProps) => (
          <div key={employee.id}>
            <span>{employee.user.name}</span>
            <span>{employee.user.email}</span>
            <span>{employee.employee_position.name}</span>
            <div>
              {employee.id !== employeeLogged.id && (
                <ButtonEdit to={`funcionarios/editar/${employee.id}`}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </ButtonEdit>
              )}

              <ButtonDelete
                onClick={() => handleDelete(employee.user.id)}
                type="button"
                disabled={employee.id === employeeLogged.id}
              >
                <FontAwesomeIcon icon={faTrash} />
              </ButtonDelete>
            </div>
          </div>
        ))}
      </Table>
    </Wrapper>
  );
};

export default EmployeesList;
