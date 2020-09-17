import React from 'react';

import { TableWrapper } from './styles';
import Pagination from '../Pagination';

interface TableProps {
  titles: string[];
  handleChangePage(currentPage: string): void;
  totalPages: number;
  currentPage: number;
}

const Table: React.FC<TableProps> = ({
  titles,
  children,
  totalPages,
  currentPage,
  handleChangePage,
}) => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          {titles.map(title => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>

      <tfoot>
        <tr>
          <td>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              changePage={handleChangePage}
            />
          </td>
        </tr>
      </tfoot>
    </TableWrapper>
  );
};

export default Table;
