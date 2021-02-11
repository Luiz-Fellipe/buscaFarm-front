import React, { useCallback, useState, useEffect, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper, ButtonNextPrev, ButtonPage } from './styles';

interface PaginationProps {
  totalPages: number;
  changePage(currentPage: string): void;
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  changePage,
  page,
}) => {
  const [pagesJSX, setPagesJSX] = useState<number[]>([]);
  const handleRenderPages = useCallback(() => {
    const data: number[] = [];

    for (let i = 1; i <= totalPages; i += 1) {
      data.push(i);
    }
    setPagesJSX(data);
  }, [totalPages]);

  const handleChangePages = useCallback(
    currentPage => {
      changePage(currentPage);
    },
    [changePage],
  );

  useEffect(() => {
    handleRenderPages();
  }, [handleRenderPages]);

  return (
    <Wrapper>
      <ButtonNextPrev
        type="button"
        disabled={page === 1}
        onClick={() => handleChangePages(page - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Anterior
      </ButtonNextPrev>
      {pagesJSX.map(pageNumber => (
        <ButtonPage
          type="button"
          key={pageNumber}
          isSelected={page === pageNumber}
          onClick={() => handleChangePages(pageNumber)}
        >
          {pageNumber}
        </ButtonPage>
      ))}
      <ButtonNextPrev
        type="button"
        disabled={page === totalPages}
        onClick={() => handleChangePages(page + 1)}
      >
        Próximo
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonNextPrev>
    </Wrapper>
  );
};

export default memo(Pagination);
