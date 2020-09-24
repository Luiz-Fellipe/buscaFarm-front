import React from 'react';
import { BounceLoader } from 'react-spinners';
import colors from '~/styles/colors';

import { Wrapper } from './styles';

interface LoadingProps {
  loading: boolean;
}

const BoxLoading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Wrapper>
      <BounceLoader size={80} color={colors.primary} loading={loading} />
    </Wrapper>
  );
};

export default BoxLoading;
