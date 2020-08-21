import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { InputWrapper, Wrapper } from './styles';

interface Props {
  name: string;
  label?: string;
  icon: React.ComponentType<IconBaseProps>;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, label, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const HandleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Wrapper>
      <InputWrapper isFilled={isFilled} isFocused={isFocused} error={error}>
        {label && <label htmlFor={fieldName}>{label}</label>}
        {Icon && <Icon size={20} />}
        <input
          onFocus={HandleInputFocus}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          autoComplete="off"
          {...rest}
        />
      </InputWrapper>
      <span>{error}</span>
    </Wrapper>
  );
};

export default Input;
