import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper, SpanError } from './styles';

interface Props {
  name: string;
  label?: string;
  icon: IconProp;
}

export type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({
  name,
  label,
  icon,
  disabled,
  ...rest
}) => {
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
    <>
      <InputWrapper
        isFilled={isFilled}
        isFocused={isFocused}
        isDisabled={disabled}
        error={error}
      >
        {label && <label htmlFor={fieldName}>{label}</label>}
        {icon && <FontAwesomeIcon icon={icon} />}
        <input
          onFocus={HandleInputFocus}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          disabled={disabled}
          defaultValue={defaultValue}
          autoComplete="off"
          {...rest}
        />
      </InputWrapper>

      {error && <SpanError>{error}</SpanError>}
    </>
  );
};

export default Input;
