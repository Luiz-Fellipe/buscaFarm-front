/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable global-require */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import ContainerWithBordes from '~/components/ContainerWithBordes';
import ButtonLink from '~/components/global/ButtonLink';
import DragAndDropFile from '~/components/global/DragAndDropFile';
import { Wrapper, HeaderModal, Title, SubTitle } from './styles';
import api from '~/services/api';
import { useToast } from '~/context/ToastContext';
import colors from '~/styles/colors';

const MedicineImport: React.FC = () => {
  const { addToast } = useToast();
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDrop = useCallback(
    files => {
      setLoading(true);
      const data = new FormData();

      data.append('csv', files[0]);
      api
        .patch('/pharmacies/upload-csv', data, {
          onUploadProgress: event => {
            const progress: number = Math.round(
              (event.loaded * 100) / event.total,
            );

            if (progress <= 100) {
              setPercent(progress);
            }
          },
        })
        .then(() => {
          addToast({
            type: 'success',
            title: 'Medicamentos importados com sucesso',
          });
          setLoading(false);
          setPercent(0);
        })
        .catch(() => {
          setLoading(false);
          addToast({
            type: 'error',
            title: 'Erro ao importar os medicamentos',
          });
        });
    },
    [addToast],
  );

  return (
    <>
      <Wrapper>
        <HeaderModal>
          <Title>
            <span>Importar Medicamentos</span>
          </Title>

          <ButtonLink className="primary" to="/medicamentos" icon={faArrowLeft}>
            <span>Voltar</span>
          </ButtonLink>
        </HeaderModal>
      </Wrapper>

      <SubTitle>
        <span>
          Importe uma tabela do tipo .CSV{' '}
          <a
            download="exemplo.csv"
            target="_blank"
            href={require('../../../static/exemplo.csv')}
          >
            como nesse exemplo
          </a>
        </span>
        {loading && (
          <ProgressBar
            completed={percent}
            margin="20px 0px"
            borderRadius="4px"
            bgcolor={colors.primary}
          />
        )}
      </SubTitle>

      <ContainerWithBordes
        widthPercent="70"
        heightPercent="33"
        borderHeightPx="81"
        borderWidthPx="12"
      >
        <DragAndDropFile handleDrop={handleDrop} loading={loading} />
      </ContainerWithBordes>
    </>
  );
};

export default MedicineImport;
