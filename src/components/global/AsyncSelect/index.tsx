import React, { useRef, useEffect } from 'react';
import { OptionTypeBase } from 'react-select';
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';

import { Wrapper } from './styles';
import colors from '~/styles/colors';

interface Props extends AsyncProps<OptionTypeBase> {
  name: string;
}

const AsyncSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const customStyles = {
    control: (styles: any, state: any) => ({
      ...styles,
      borderColor: `${colors.gray};`,
      boxShadow: state.isFocused && `none`,
      '&:focus': {
        borderWidth: '2px',
        borderColor: `${colors.primary};`,
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
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Wrapper>
      <Select
        cacheOptions
        defaultValue={defaultValue}
        styles={customStyles}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
      <span>{error}</span>
    </Wrapper>
  );
};

export default AsyncSelect;
