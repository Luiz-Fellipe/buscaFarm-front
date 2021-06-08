import React from 'react';

import {
  TableWrapper,
  TableHeader,
  TableBody,
  TableFooter,
  IsEmpty,
} from './styles';
import Pagination from '../Pagination';
import BoxLoading from '~/components/global/BoxLoading';

interface TableProps {
  titles: string[];
  handleChangePage(currentPage: string): void;
  totalPages: number;
  currentPage: number;
  searching: boolean | string;
  existData: boolean | string;
  loading: boolean;
}

const Table: React.FC<TableProps> = ({
  titles,
  children,
  totalPages,
  currentPage,
  searching,
  loading,
  existData,
  handleChangePage,
}) => {
  return (
    <TableWrapper>
      <TableHeader qtdColumns={titles.length}>
        {titles.map(title => (
          <span key={title}>{title}</span>
        ))}
      </TableHeader>

      {existData && (
        <TableBody qtdColumns={titles.length}>{children}</TableBody>
      )}

      {searching && (
        <IsEmpty>
          <span>Não encontramos o resultado para sua busca.</span>
        </IsEmpty>
      )}

      {loading && (
        <IsEmpty>
          <BoxLoading loading />
        </IsEmpty>
      )}
      {!searching && !loading && !existData && (
        <IsEmpty>
          <span>Nenhum resultado encontrado</span>
        </IsEmpty>
      )}

      <TableFooter>
        {existData && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            changePage={handleChangePage}
          />
        )}
      </TableFooter>
    </TableWrapper>
  );
};

export default Table;
