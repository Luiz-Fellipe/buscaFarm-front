import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from './styles';

interface ButtonPrimaryProps {
  icon: IconProp;
  children: ReactNode;
  loading?: boolean;
}

const ButtonSecondary: React.FC<ButtonPrimaryProps> = ({
  icon,
  children,
  loading,
}) => {
  return (
    <Button>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          <FontAwesomeIcon icon={icon} />
          {children}
        </>
      )}
    </Button>
  );
};

export default ButtonSecondary;
