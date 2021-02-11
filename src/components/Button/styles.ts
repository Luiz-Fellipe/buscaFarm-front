import styled from 'styled-components';
import colors from '~/styles/colors';

export const ButtonPrimary = styled.button`
  width: 30%;
  height: 40px;
  border: none;

  background: ${colors.primary};
  border-radius: 15px;
  > svg {
    color: #fff;
  }

  > span {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
    color: #fff;
  }
`;
