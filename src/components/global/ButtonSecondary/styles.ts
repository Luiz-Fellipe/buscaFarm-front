import styled from 'styled-components';
import colors from '~/styles/colors';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 10px;

  svg {
    margin-right: 15px;
    color: ${colors.white};
  }
`;
