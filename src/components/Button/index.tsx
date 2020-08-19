import React, { ButtonHTMLAttributes } from 'react';

import { ButtonPrimary } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC = ({ children, ...rest }) => {
  return (
    <ButtonPrimary type="button" {...rest}>
      {children}
    </ButtonPrimary>
  );
};

export default Button;
