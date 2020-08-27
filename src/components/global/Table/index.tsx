import React from 'react';

import { TableWrapper } from './styles';
import Pagination from '../Pagination';

interface TableProps {
  titles: string[];
}

const Table: React.FC<TableProps> = ({ titles, children }) => {
  return (
    <TableWrapper>
      <tr>
        {titles.map(title => (
          <th key={title}>{title}</th>
        ))}
      </tr>
      {children}
      <tfoot>
        <Pagination page={1} totalPages={5} />
      </tfoot>
    </TableWrapper>
  );
};

export default Table;
