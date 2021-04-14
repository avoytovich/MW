import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const InheritanceField = (props) => {
  // return null;
  const { children: Children, value, onChange, parentId, currentProductData, field } = props;
  if (value?.value === 'ENABLED') {
    console.log('ENABLED', value);
  }

  if (!Children) return null;
  if (!parentId || !value?.state) return Children;

  const handleChange = (value) => {
    const { value: inheritanceValue, onChange } = props;
    // console.log('VALUE', typeof value);
    // console.log('inheritanceValue', inheritanceValue);
    onChange({
      ...currentProductData,
      [field]: {
        ...inheritanceValue,
        value: typeof value === 'object' ? value?.target?.value : value,
      },
    });
  };

  let inputValue = value.state === 'inherits' ? value.parentValue : value.value;
  if (field === 'status') {
    // inputValue = value.state === 'inherits' && inputValue === 'ENABLED' ? true : false;
    console.log('INPUT_VALUE', inputValue);
    // inputProps['checked'] = inputValue;
  }

  const inputProps = {
    value: inputValue,
    isDisabled: value.state === 'inherits',
    onChange: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeInput: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeSelect: handleChange, // overrides the one in wrappedProps, to allow proxying
    onBlur: () => null,
    onDragStart: () => null,
    onDrop: () => null,
    onFocus: () => null,
  };

  if (field === 'status') {
    inputProps['checked'] = inputValue === 'ENABLED' ? true : false;
  }

  const newChildren = {
    ...Children,
    props: {
      ...Children.props,
      ...inputProps,
    },
  };

  const onClickInheritanceButton = () => {
    // const { state, value } = value;
    console.log('INHERITANCE_HANDLER', value);
    onChange({
      ...currentProductData,
      [field]: {
        ...value,
        state: value.state === 'inherits' ? 'overrides' : 'inherits',
      },
    });
  };

  return (
    <>
      {newChildren}
      <Tooltip
        title={
          value.state === 'inherits'
            ? 'Click this buuton to override value'
            : 'Click this button to inherit value from the parent product'
        }
      >
        <Button
          size="small"
          color={value.state === 'inherits' ? 'secondary' : 'primary'}
          onClick={() => onClickInheritanceButton()}
        >
          {value.state === 'inherits' ? <LinkOffIcon /> : <InsertLinkIcon />}
        </Button>
      </Tooltip>
    </>
  );
};

InheritanceField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default InheritanceField;
