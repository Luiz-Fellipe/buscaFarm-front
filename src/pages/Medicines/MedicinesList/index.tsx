import React, { useCallback, useEffect, useState } from 'react';
import {
  faPencilAlt,
  faPlusCircle,
  faSearch,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import ButtonLink from '~/components/global/ButtonLink';
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
  ButtonGroup,
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

  price: number;
  amount: number;
  medicine: {
    id: string;
    name: string;
    manufacturer: string;
    image_url: string;
  };
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
      } = await api.get('/pharmacies/medicines', {
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
          .delete(`pharmacies/medicines/${id}`)

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
          <ButtonGroup>
            <ButtonLink
              icon={faUpload}
              className="primary"
              to="/medicamentos/importar"
            >
              <span>IMPORTAR MEDICAMENTOS</span>
            </ButtonLink>
            <ButtonAdd to="/medicamentos/cadastrar">
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>CADASTRAR</span>
            </ButtonAdd>
          </ButtonGroup>
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
        {medicines.map((pharmacieMedicine: MedicineProps) => (
          <div key={pharmacieMedicine.medicine.id}>
            <span style={{ textTransform: 'capitalize' }}>
              {pharmacieMedicine.medicine.name}
            </span>
            <span style={{ textTransform: 'capitalize' }}>
              {pharmacieMedicine.medicine.manufacturer}
            </span>
            <span>
              {formatCurrency('pt-br', 'BRL', pharmacieMedicine.price)}
            </span>
            <span>{pharmacieMedicine.amount}</span>
            <div>
              <ButtonEdit
                type="button"
                to={`/medicamentos/editar/${pharmacieMedicine.medicine.id}`}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </ButtonEdit>

              <ButtonDelete
                type="button"
                onClick={() => handleDelete(pharmacieMedicine.id)}
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
