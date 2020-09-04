import styled from 'styled-components';
import colors from '~/styles/colors';

export const TableWrapper = styled.table`
  width: 100%;
  border: none;
  background: ${colors.white};
  border-spacing: 0;
  border-radius: 4px;
  margin-bottom: 50px;

  td,
  th {
    text-align: left;
    padding: 8px 15px;
  }

  tbody {
    > tr {
      line-height: 60px;
    }

    > tr:nth-child(even) {
      background-color: #eeeeee;
    }
  }

  tfoot {
    line-height: 100px;
  }
`;
