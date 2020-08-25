import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Button } from './styles';

interface ButtonPrimaryProps {
  icon: IconProp;
  children: ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ icon, children }) => {
  return (
    <Button>
      <FontAwesomeIcon icon={icon} />
      {children}
    </Button>
  );
};

export default ButtonPrimary;
