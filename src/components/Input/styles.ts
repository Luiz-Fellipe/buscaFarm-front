import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  error?: string;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: red;
    margin-top: 10px;
  }
`;

export const InputWrapper = styled.div<ContainerProps>`
  display: flex;
  background: ${colors.white};
  border-radius: 10px;
  border: 2px solid #d9d9d9;
  padding: 16px;
  width: 100%;
  align-items: center;
  color: #666369;

  ${props =>
    props.error &&
    css`
      color: red;
      border-color: red;
    `}


  ${props =>
    props.isFocused &&
    css`
      color: ${colors.primary};
      border-color: ${colors.primary};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${colors.primary};
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;

    &::placeholder {
      color: #666360;
    }

    &::-webkit-input-placeholder {
      text-align: center;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
