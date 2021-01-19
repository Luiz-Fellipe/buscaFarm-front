import React, { useCallback, useEffect, useState } from 'react';
import {
  faPencilAlt,
  faPlusCircle,
  faSearch,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { debounce } from 'lodash';
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
import { useToast } from '~/context/ToastContext';
import api from '~/services/api';
import formatCurrency from '~/utils/formatCurrency';
import tickSvg from '~/assets/icons/tick.svg';
import exclamationSvg from '~/assets/icons/exclamation-mark.svg';

import { AindaSwal } from '~/components/global/AindaSwal';
import colors from '~/styles/colors';

interface PageProps {
  pageStart: number;
  searchValue: string;
}

interface MedicineProps {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  amount: number;
}

const LIMIT_PER_PAGE = 7;

const MedicineList: React.FC = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const [pageState, setPageState] = useState<PageProps>({
    pageStart: 1,
    searchValue: '',
  });

  const { addToast } = useToast();

  const searching: string | boolean =
    !loading && pageState.searchValue && !medicines.length;
  const existMedicines = !loading && !!medicines.length;

  const loadMedicines = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data, count },
      } = await api.get('/medicines', {
        params: {
          pageStart: (pageState.pageStart - 1) * LIMIT_PER_PAGE,
          pageLength: LIMIT_PER_PAGE,
          search: pageState.searchValue,
        },
      });

      setTotalPage(Math.ceil(count / LIMIT_PER_PAGE));

      setMedicines(data);
      setLoading(false);
    } catch {
      setLoading(false);
      addToast({
        type: 'error',
        title: 'Erro ao carregar Medicamentos',
        description:
          'Não foi possivel carregar a lista de medicamentos. tente novamente mais tarde',
      });
    }
  }, [addToast, pageState]);

  const handleChangePage = useCallback(currentPg => {
    setPageState(state => {
      return { ...state, pageStart: currentPg };
    });
  }, []);

  function handleDelete(id: string) {
    AindaSwal.fire({
      title: 'Tem certeza de que deseja excluir este medicamento?',
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
          .delete(`/medicines/delete/${id}`)

          .then((res: any) => {
            if (res.status === 204) {
              setMedicines(
                medicines.filter(
                  (medicine: MedicineProps) => medicine.id !== id,
                ),
              );

              Swal.fire({
                title: 'Deletado!',
                text: 'Medicamento deletado com sucesso.',
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

  useEffect(() => {
    loadMedicines();
  }, [loadMedicines]);

  const debounced = useCallback(debounce(handleSearchValue, 600), []);

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
              onChange={e => debounced(e.target.value)}
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
        totalPages={totalPage}
        currentPage={pageState.pageStart}
        existData={existMedicines}
        loading={loading}
        searching={searching}
      >
        {medicines.map((medicine: MedicineProps) => (
          <div key={medicine.id}>
            <span>{medicine.name}</span>
            <span>{medicine.manufacturer}</span>
            <span>{formatCurrency('pt-br', 'BRL', medicine.price)}</span>
            <span>{medicine.amount}</span>
            <div>
              <ButtonEdit
                type="button"
                to={`/medicamentos/editar/${medicine.id}`}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonEdit>

              <ButtonDelete
                type="button"
                onClick={() => handleDelete(medicine.id)}
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

export default MedicineList;
