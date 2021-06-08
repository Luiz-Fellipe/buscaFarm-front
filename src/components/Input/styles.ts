import styled, { css } from 'styled-components';
import colors from '~/styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isDisabled: boolean | undefined;
  error?: string;
}

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  align-items: center;
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
  width: 100%;
  
  align-items: center;
  color: #666369;

 ${props =>
   props.isDisabled &&
   css`
     background-color: rgba(0, 0, 0, 0.06);
     cursor: not-allowed;
   `}

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
    padding: 16px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    &::placeholder {
      color: #666360;
    }

    &::-webkit-input-placeholder {
      text-align: center;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  svg {
    margin-right: 16px;
    margin-left: 16px;
  }
`;

export const SpanError = styled.span`
  color: ${colors.red};
  font-weight: bold;
  display: block;
  margin-top: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;
