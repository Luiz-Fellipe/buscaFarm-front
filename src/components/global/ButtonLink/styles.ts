import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '~/styles/colors';

export const Button = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;

  border: none;
  border-radius: 10px;

  &.primary {
    background: ${colors.gray};
    color: ${colors.white};
    > svg {
      margin-right: 15px;
      color: ${colors.white};
    }
  }

  &.secondary {
    background: ${colors.primary};
    color: ${colors.white};
    > svg {
      margin-right: 15px;
      color: ${colors.white};
    }
  }
`;
