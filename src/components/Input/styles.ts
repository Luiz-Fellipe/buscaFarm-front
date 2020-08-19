import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

interface ContainerProps {
  isFocused: boolean;
}

export const InputWrapper = styled.div<ContainerProps>`
  ${props =>
    props.isFocused &&
    css`
      color: ${colors.primary};
    `}

  input {
    width: 250px;
    border: none;
    border-bottom: 1px solid #c4c4c4;

    &::-webkit-input-placeholder {
      text-align: center;
    }
  }
`;
