import React, { useRef, useEffect } from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';
import colors from '~/styles/colors';
import { Wrapper } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const SimpleSelect: React.FC<Props> = ({ name, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const colourStyles = {
    control: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: 'white',
      borderColor: error
        ? `${colors.red};`
        : state.isFocused
        ? `${colors.primary};`
        : `${colors.grayLigth};`,
      borderWidth: '2px',
      boxShadow: '0 !important',
      borderRadius: '10px',
      height: '55px',
      ':hover': {
        borderColor: `${colors.grayLigth};`,
      },
    }),
    option: (styles: any, { isFocused }: { isFocused: boolean }) => ({
      backgroundColor: isFocused ? `${colors.primary};` : 'white',
      padding: '10px',
    }),
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Wrapper>
      <Select
        defaultValue={
          defaultValue &&
          options &&
          options.find(option => option.value === defaultValue)
        }
        ref={selectRef}
        label="Cargo"
        styles={colourStyles}
        classNamePrefix="react-select"
        {...rest}
      />
      <span>{error}</span>
    </Wrapper>
  );
};

export default SimpleSelect;
