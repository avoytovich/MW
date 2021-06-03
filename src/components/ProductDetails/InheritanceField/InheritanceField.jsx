import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const InheritanceField = (props) => {
  const {
    children: Children, value, parentId, currentProductData, field, onChange,
  } = props;

  if (!Children) return null;
  if (!parentId || !value?.state) return Children;

  const handleOnClickDelIcon = (chip) => {
    const { value: inheritanceValue } = props;
    const newValue = [...inheritanceValue.value].filter((val) => val !== chip);

    onChange({
      ...currentProductData,
      [field]: {
        ...inheritanceValue,
        value: newValue,
      },
    });
  };

  const handleChange = (value) => {
    const { value: inheritanceValue } = props;

    if (field === 'status') {
      onChange({
        ...currentProductData,
        [field]: {
          ...inheritanceValue,
          value: value?.target?.value === 'ENABLED' ? 'DISABLED' : 'ENABLED',
        },
      });
      return;
    }
    if (field === 'physical') {
      onChange({
        ...currentProductData,
        [field]: {
          ...inheritanceValue,
          value: !inheritanceValue.value,
        },
      });
      return;
    }
    if (field === 'defaultCurrency') {
      onChange({
        ...currentProductData,
        prices: {
          ...inheritanceValue,
          value: {
            ...inheritanceValue.value,
            [field]: value.target.value,
          },
        },
      });
      return;
    }
    onChange({
      ...currentProductData,
      [field]: {
        ...inheritanceValue,
        value: typeof value === 'object' ? value?.target?.value : value,
      },
    });
  };

  let inputValue = value.state === 'inherits' ? value.parentValue : value.value;

  if (field === 'defaultCurrency') {
    inputValue = inputValue[field];
  }

  const inputProps = {
    value: inputValue,
    isDisabled: value.state === 'inherits',
    disabled: value.state === 'inherits',
    onChange: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeInput: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeSelect: handleChange, // overrides the one in wrappedProps, to allow proxying
    onClickDelIcon: handleOnClickDelIcon,
    onBlur: () => null,
    onDragStart: () => null,
    onDrop: () => null,
    onFocus: () => null,
  };

  if (field === 'status') {
    inputProps.checked = inputValue === 'ENABLED';
  }

  if (field === 'physical') {
    inputProps.checked = inputValue;
  }

  const newChildren = {
    ...Children,
    props: {
      ...Children.props,
      ...inputProps,
    },
  };

  const onClickInheritanceButton = () => {
    onChange({
      ...currentProductData,
      [field]: {
        ...value,
        state: value.state === 'inherits' ? 'overrides' : 'inherits',
      },
    });
  };

  if (field === 'defaultCurrency') {
    return newChildren;
  }

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
          size='small'
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
  children: PropTypes.node,
  parentId: PropTypes.string,
  currentProductData: PropTypes.object,
  field: PropTypes.string,
};

export default InheritanceField;
