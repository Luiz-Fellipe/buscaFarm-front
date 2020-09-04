import styled from 'styled-components';
import colors from '~/styles/colors';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 8%;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;

  svg {
    margin-right: 15px;
    color: ${colors.white};
  }
`;
