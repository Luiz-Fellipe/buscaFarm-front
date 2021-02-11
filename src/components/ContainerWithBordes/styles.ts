import styled from 'styled-components';
import colors from '~/styles/colors';

interface BorderProps {
  borderWidthPx: string;
  borderHeightPx: string;
}
interface WrapperProps {
  widthPercent: string;
  heightPercent: string;
}

export const Wrapper = styled.div<WrapperProps>`
  margin: auto;
  background-color: white;
  width: ${props => `${props.widthPercent}%`};
  height: ${props => `${props.heightPercent}%`};
  position: relative;
`;
export const Content = styled.div`
  width: 100%;
  height: 100%;
`;
export const BorderLeftTop = styled.div<BorderProps>`
  display: block;
  transition: all 0.3s ease;

  .border-left-v {
    background: ${colors.primary};
    height: ${props => `${props.borderHeightPx}px`};
    width: 100px;
    left: ${props => `-${props.borderWidthPx}px`};
    top: ${props => `-${props.borderWidthPx}px`};
    position: absolute;
    bottom: 0;
    z-index: -1;
    right: 0px;
  }
  .border-left-h {
    background: ${colors.primary};
    height: ${props => `${props.borderHeightPx}px`};
    width: 100px;
    left: ${props => `-${props.borderWidthPx}px`};
    top: ${props => `-${props.borderWidthPx}px`};
    z-index: -1;
    position: absolute;
    bottom: 0;
    right: 0px;
  }
`;
export const BorderRightBottom = styled.div<BorderProps>`
  display: block;
  transition: all 0.3s ease;
  z-index: -1;
  .border-right-v {
    background: ${colors.primary};
    height: ${props => `${props.borderHeightPx}px`};
    width: 100px;
    right: ${props => `-${props.borderWidthPx}px`};
    bottom: ${props => `-${props.borderWidthPx}px`};
    z-index: -1;
    position: absolute;
  }
  .border-right-h {
    background: ${colors.primary};
    height: ${props => `${props.borderHeightPx}px`};
    width: 100px;
    right: ${props => `-${props.borderWidthPx}px`};
    bottom: ${props => `-${props.borderWidthPx}px`};
    z-index: -1;
    position: absolute;
  }
`;
