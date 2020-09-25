import styled from 'styled-components';
import colors from '~/styles/colors';

interface TableProps {
  qtdColumns: Number;
}

export const TableWrapper = styled.div`
  width: 100%;
  border: none;
  background: ${colors.white};
  border-spacing: 0;
  border-radius: 4px;
  margin-bottom: 50px;
`;

export const TableHeader = styled.div<TableProps>`
  margin-left: 10px;
  display: grid;
  grid-template-columns: ${props =>
    props.qtdColumns ? `repeat(${props.qtdColumns}, 1fr)` : '1fr'};
  grid-template-rows: 50px;

  > span {
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const TableBody = styled.div<TableProps>`
  display: grid;

  > div {
    display: grid;
    grid-template-columns: ${props =>
      props.qtdColumns ? `repeat(${props.qtdColumns}, 1fr)` : '1fr'};
    grid-template-rows: 80px;

    > span {
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    > div {
      margin-left: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  > div:nth-child(even) {
    background-color: #eeeeee;
  }
`;

export const TableFooter = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5px;
`;

export const IsEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;

  > span {
    font-size: 20px;
  }
`;
