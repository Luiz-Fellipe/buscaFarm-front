import styled from 'styled-components';
import colors from '~/styles/colors';

interface IContainerProps {
  isDragging: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: ${props =>
    props.isDragging ? `2px dashed ${colors.primary}` : 'none'};
  > span {
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    color: ${colors.primary};
  }

  > svg {
    font-size: 70px;
    color: ${colors.primary};
  }
`;
