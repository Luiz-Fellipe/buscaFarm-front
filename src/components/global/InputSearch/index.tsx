import React, { useRef, useState, useCallback } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper, Wrapper } from './styles';

interface Props {
  icon: IconProp;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const InputSearch: React.FC<InputProps> = ({ icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const HandleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Wrapper>
      <InputWrapper isFilled={isFilled} isFocused={isFocused}>
        {icon && <FontAwesomeIcon icon={icon} />}
        <input
          onFocus={HandleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          autoComplete="off"
          {...rest}
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default InputSearch;
