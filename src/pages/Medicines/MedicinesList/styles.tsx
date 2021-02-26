import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  width: 70%;
  margin: auto;
`;

export const Header = styled.div`
  margin: 30px 0;
`;
export const Title = styled.div`
  span {
    font-size: 36px;
    font-weight: bold;
  }
`;

export const Functionalities = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
`;

export const Input = styled.div`
  width: 30%;
`;

export const ButtonAdd = styled(Link)`
  background: ${colors.primary};
  padding: 15px 20px;
  border-radius: 10px;
  color: ${colors.white};
  border: none;
  text-decoration: none;
  svg {
    margin-right: 20px;
  }
`;

export const ButtonDelete = styled.button`
  padding: 5px 8px;
  background: ${colors.red};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
`;

export const ButtonEdit = styled(Link)`
  padding: 5px 8px;
  background: ${colors.yellow};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  margin-right: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > a:not(:first-child) {
    margin-left: 10px;
  }
`;
