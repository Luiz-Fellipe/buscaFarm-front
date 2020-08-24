import React, { FunctionComponent } from 'react';

import { Wrapper, Content, BorderLeftTop, BorderRightBottom } from './styles';

interface Props {
  widthPercent: string;
  heightPercent: string;
  borderWidthPx: string;
  borderHeightPx: string;
}

const ContainerWithBordes: FunctionComponent<Props> = ({
  children,
  widthPercent,
  heightPercent,
  borderWidthPx,
  borderHeightPx,
}) => {
  return (
    <Wrapper widthPercent={widthPercent} heightPercent={heightPercent}>
      <BorderLeftTop
        borderWidthPx={borderWidthPx}
        borderHeightPx={borderHeightPx}
      >
        <span className="border-left-v" />
        <span className="border-left-h" />
      </BorderLeftTop>
      <Content>{children}</Content>
      <BorderRightBottom
        borderWidthPx={borderWidthPx}
        borderHeightPx={borderHeightPx}
      >
        <span className="border-right-h" />
        <span className="border-right-v" />
      </BorderRightBottom>
    </Wrapper>
  );
};

export default ContainerWithBordes;
