import {
  // faPencilAlt,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import Table from '~/components/global/Table';
import exclamationSvg from '~/assets/icons/exclamation-mark.svg';
import { AindaSwal } from '~/components/global/AindaSwal';
import InputSearch from '~/components/global/InputSearch';
import tickSvg from '~/assets/icons/tick.svg';
import colors from '~/styles/colors';

import {
  Wrapper,
  ButtonDelete,
  // ButtonEdit,
  Header,
  Title,
  Functionalities,
  Input,
} from './styles';
// import colors from '~/styles/colors';
import { useAuth } from '~/context/AuthContext';
import api from '~/services/api';

import { useToast } from '~/context/ToastContext';
import { parseDate } from '~/utils/formatDate';

interface PageProps {
  pageStart: number;
  searchValue: string;
}

interface BudgetsProps {
  user: {
    name: string;
  };
  id: string;
  created_at: string;
  value: string;
}

const LIMIT_PER_PAGE = 7;

const Budgets: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [budgets, setBudgets] = useState([]);

  const [pageState, setPageState] = useState<PageProps>({
    pageStart: 1,
    searchValue: '',
  });

  const searching: string | boolean =
    !loading && pageState.searchValue && !budgets.length;

  const existBudgets = !loading && !!budgets.length;

  const { addToast } = useToast();

  const { pharmacie } = useAuth();

  const loadBudgets = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data, count },
      } = await api.get('/budgets', {
        params: {
          pageStart: (pageState.pageStart - 1) * LIMIT_PER_PAGE,
          pageLength: LIMIT_PER_PAGE,
          search: pageState.searchValue,
          pharmacie_id: pharmacie.id,
        },
      });
      setBudgets(data);
      setTotalPage(Math.ceil(count / LIMIT_PER_PAGE));
      setLoading(false);
    } catch {
      setLoading(false);
      addToast({
        type: 'error',
        title: 'Erro ao carregar Orçamentos',
        description:
          'Não foi possivel carregar a lista de orçamentos. tente novamente mais tarde',
      });
    }
  }, [addToast, pageState, pharmacie.id]);

  function handleDelete(id: string) {
    AindaSwal.fire({
      title: 'Tem certeza de que deseja excluir este orçamento?',
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
          .delete(`/budgets/${id}`)

          .then((res: any) => {
            if (res.status === 204) {
              setBudgets(oldState =>
                oldState.filter(
                  (budgetsDelete: BudgetsProps) => budgetsDelete.id !== id,
                ),
              );

              Swal.fire({
                title: 'Deletado!',
                text: 'Orçamento deletado com sucesso.',
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

  const handleSearchValue = useCallback(value => {
    setPageState({ pageStart: 1, searchValue: value });
  }, []);

  const debounced = useCallback(debounce(handleSearchValue, 600), []);

  const handleChangePage = useCallback(currentPg => {
    setPageState(state => {
      return { ...state, pageStart: currentPg };
    });
  }, []);
  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Gerenciar Orçamentos</span>
        </Title>
        <Functionalities>
          <Input>
            <InputSearch
              icon={faSearch}
              placeholder="Buscar Por Orçamentos"
              onChange={e => debounced(e.target.value)}
            />
          </Input>
        </Functionalities>
      </Header>
      <Table
        titles={['NOME', 'DATA', 'VALOR', 'AÇÕES']}
        handleChangePage={handleChangePage}
        existData={existBudgets}
        searching={searching}
        loading={loading}
        totalPages={totalPage}
        currentPage={pageState.pageStart}
      >
        {budgets.map((budgetsFarm: BudgetsProps) => (
          <>
            <div>
              <span>{budgetsFarm.user.name}</span>
              <span>
                {budgetsFarm &&
                  budgetsFarm.created_at &&
                  parseDate({
                    date: budgetsFarm.created_at,
                    dateFormat: 'dd/MM/yyyy',
                  })}
              </span>
              <span>
                R$
                {budgetsFarm.value}
              </span>
              {/* <span style={{ color: colors.yellow, fontWeight: 'bold' }}>
                PENDENTE
              </span> */}
              <div>
                {/* <ButtonEdit type="button">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </ButtonEdit> */}
                <ButtonDelete
                  type="button"
                  onClick={() => handleDelete(budgetsFarm.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </ButtonDelete>
              </div>
            </div>
          </>
        ))}
      </Table>
    </Wrapper>
  );
};

export default Budgets;
