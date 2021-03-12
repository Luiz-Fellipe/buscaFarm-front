import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '~/context/ToastContext';

import ButtonSecondary from '../ButtonSecondary';
import { Container } from './styles';
import BoxLoading from '~/components/global/BoxLoading';

interface IProps {
  handleDrop(acceptedFiles: any): any;
  multiple?: boolean;
  loading: boolean;
}

const DragAndDropFile: React.FC<IProps> = ({
  handleDrop,
  multiple = false,
  loading,
}) => {
  const { addToast } = useToast();

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length > 0) {
        handleDrop(acceptedFiles);
      } else {
        addToast({
          type: 'error',
          title: 'Error ao importar arquivo',
          description: 'Importe apenas 1 arquivo por vez',
        });
      }
    },
    [handleDrop, addToast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  return (
    <Container isDragging={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive && (
        <>
          <FontAwesomeIcon icon={faUpload} />
          <span>Solte aqui</span>
        </>
      )}
      {!isDragActive && !loading && (
        <>
          <ButtonSecondary icon={faUpload}>Importar Tabela</ButtonSecondary>
          <span>Ou arraste até aqui</span>
        </>
      )}
      {!isDragActive && loading && (
        <>
          <BoxLoading loading />
          <span>Carregando...</span>
        </>
      )}
    </Container>
  );
};

export default DragAndDropFile;
