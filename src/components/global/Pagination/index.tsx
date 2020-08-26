import React, { useCallback, useState, useEffect, memo } from 'react';

import { Wrapper, ButtonNextPrev, ButtonPage } from './styles';

interface PaginationProps {
  totalPages: number;
  // changePage(): void;
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  // changePage,
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

  useEffect(() => {
    handleRenderPages();
  }, [handleRenderPages]);

  return (
    <Wrapper>
      <ButtonNextPrev type="button" disabled={page === 1}>
        Anterior
      </ButtonNextPrev>
      {pagesJSX.map(pageNumber => (
        <ButtonPage
          type="button"
          key={pageNumber}
          isSelected={page === pageNumber}
        >
          {pageNumber}
        </ButtonPage>
      ))}
      <ButtonNextPrev type="button" disabled={page === totalPages}>
        Próximo
      </ButtonNextPrev>
    </Wrapper>
  );
};

export default memo(Pagination);
