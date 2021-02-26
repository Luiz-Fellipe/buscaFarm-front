import {
  // faPencilAlt,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
  const [budgetsOrganization, setBudgetsOrganization] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [budgets, setBudgets] = useState([]);

  const [pageState, setPageState] = useState<PageProps>({
    pageStart: 1,
    searchValue: '',
  });

  const searching: string | boolean =
    !loading && pageState.searchValue && !budgetsOrganization.length;

  const existBudgets = !loading && !!budgetsOrganization.length;

  const { addToast } = useToast();

  const { pharmacie } = useAuth();

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
              setBudgetsOrganization(
                budgetsOrganization.filter(
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
      setBudgetsOrganization(data);
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

  const handleChangePage = useCallback(currentPg => {
    setPageState(state => {
      return { ...state, pageStart: currentPg };
    });
  }, []);
  console.log('salve', budgets);
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
            <InputSearch icon={faSearch} placeholder="Buscar Por Orçamentos" />
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
              <span>{budgetsFarm.created_at}</span>
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
