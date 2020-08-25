import styled from 'styled-components';
import colors from '~/styles/colors';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background: ${colors.gray};
  color: ${colors.white};
  border: none;

  svg {
    margin-right: 15px;
    color: ${colors.white};
  }
`;
