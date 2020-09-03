import React from 'react';

import { TableWrapper } from './styles';
import Pagination from '../Pagination';

interface TableProps {
  titles: string[];
}

const Table: React.FC<TableProps> = ({ titles, children }) => {
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
            <Pagination page={1} totalPages={5} />
          </td>
        </tr>
      </tfoot>
    </TableWrapper>
  );
};

export default Table;
