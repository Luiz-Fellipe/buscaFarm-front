import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Button } from './styles';

interface ButtonPrimaryProps {
  icon: IconProp;
  children: ReactNode;
  to: string;
  className: 'primary' | 'secondary';
}

const ButtonLink: React.FC<ButtonPrimaryProps> = ({
  icon,
  children,
  className,
  to,
  ...rest
}) => {
  return (
    <Button to={to} className={className} {...rest}>
      <FontAwesomeIcon icon={icon} />
      {children}
    </Button>
  );
};

export default ButtonLink;
