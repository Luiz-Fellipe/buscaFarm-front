import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import colors from '~/styles/colors';
import { Wrapper } from './styles';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
}
const AsyncSelect: React.FC<Props> = ({ name, options, ...rest }) => {
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
    loadingIndicator: (styles: any) => ({
      ...styles,

      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '> span': {
        color: `${colors.primary}`,
        marginTop: '0',
      },
    }),
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.select.setValue(value);
      },
      clearValue: ref => {
        ref.select.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti, options]);
  return (
    <Wrapper>
      <Select
        cacheOptions
        styles={colourStyles}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      <span>{error}</span>
    </Wrapper>
  );
};
export default AsyncSelect;
