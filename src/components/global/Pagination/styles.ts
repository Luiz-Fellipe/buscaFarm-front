import styled from 'styled-components';
import colors from '~/styles/colors';

interface ButtonPageProps {
  isSelected: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
`;

export const ButtonNextPrev = styled.button`
  padding: 5px 10px;
  background: ${colors.primary};
  border-radius: 4px;
  color: ${colors.white};
  margin-left: 15px;
  border: none;

  svg {
    margin-right: 10px;
    margin-left: 10px;
    font-weight: bold;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ButtonPage = styled.button<ButtonPageProps>`
  padding: 5px 10px;
  margin-left: 10px;
  margin-right: 0px;
  border: ${props =>
    props.isSelected ? `1px solid ${colors.primary}` : 'none'};
  border-radius: 4px;
  background: ${props => (props.isSelected ? colors.white : colors.primary)};
  color: ${props => (props.isSelected ? colors.primary : colors.white)};
  font-weight: 500;
`;
