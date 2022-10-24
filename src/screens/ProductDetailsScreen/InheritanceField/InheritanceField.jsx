import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tooltip } from '@mui/material';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { checkValue } from '../../../services/helpers/dataStructuring';

const InheritanceField = (props) => {
  const {
    children: Children,
    value,
    additionalValue,
    parentId,
    currentProductData,
    field,
    additionalField,
    onChange,
    containerStyles,
    buttonStyles,
    buttonAction,
    isTinymce,
    localizedLang,
  } = props;
  if (!Children) return null;
  if (!parentId || !value?.state) return Children;

  const handleOnClickDelIcon = (chip) => {
    const { value: inheritanceValue } = props;
    const newValue = [...inheritanceValue?.value].filter((val) => val !== chip);

    onChange({
      ...currentProductData,
      [field]: {
        ...inheritanceValue,
        value: newValue,
      },
    });
  };

  const handleChange = (val) => {
    const { value: inheritanceValue } = props;

    if (field === 'status') {
      onChange({
        ...currentProductData,
        [field]: {
          ...inheritanceValue,
          value: val?.target?.value === 'ENABLED' ? 'DISABLED' : 'ENABLED',
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
            [field]: val?.target?.value,
          },
        },
      });
      return;
    }

    if (field === 'blackListedCountries' && typeof val?.target?.value === 'string') {
      return;
    }
    if (field === 'sellingStores') {
      onChange({
        ...currentProductData,
        [field]: {
          ...inheritanceValue,
          value: val,
        },
      });
      return;
    }
    if (field === 'trialAllowed') {
      onChange({
        ...currentProductData,
        [field]: {
          ...inheritanceValue,
          value: !checkValue(currentProductData?.trialAllowed),
        },
      });
      return;
    }
    onChange({
      ...currentProductData,
      [field]: {
        ...inheritanceValue,
        value: typeof val === 'object' ? val?.target?.value : val,
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
    onSelect: handleChange,
    onChange: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeInput: handleChange, // overrides the one in wrappedProps, to allow proxying
    onChangeSelect: handleChange, // overrides the one in wrappedProps, to allow proxying
    onClickDelIcon: handleOnClickDelIcon,
    onBlur: Children?.props?.onBlur || (() => null),
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

  if (isTinymce) {
    delete inputProps.disabled;
    delete inputProps.value;
    delete inputProps.onChange;
  }

  const newChildren = {
    ...Children,
    props: {
      ...Children.props,
      ...inputProps,
    },
  };

  const onClickInheritanceButton = () => {
    const isInherits = value.state === 'inherits' ? 'overrides' : 'inherits';
    let newData = {};
    if (localizedLang) {
      newData = {
        ...currentProductData,
        [localizedLang]: {
          ...currentProductData[localizedLang],
          [field]: {
            ...value, state: isInherits,
          },
        },
      };
    } else {
      newData = {
        ...currentProductData,
        [field]: {
          ...value,
          state: isInherits,
        },
      };
      if (additionalField) {
        newData[additionalField] = {
          ...additionalValue,
          state: isInherits,
        };
      }
    }
    onChange(newData);

    buttonAction && buttonAction();
  };

  if (field === 'defaultCurrency') {
    return newChildren;
  }

  const stylesForTinymce = isTinymce && newChildren.props.isDisabled ? {
    opacity: '0.5',
  } : {};

  return (
    <Box display='flex' width={1} {...containerStyles}>
      <Box flexGrow={1} maxWidth='calc(100% - 64px)' display='flex' style={stylesForTinymce}>
        {newChildren}
      </Box>

      <Tooltip
        disableInteractive
        title={
          value.state === 'inherits'
            ? 'Click this button to override value'
            : 'Click this button to inherit value from the parent product'
        }
      >
        <Button
          size='small'
          color={value.state === 'inherits' ? 'secondary' : 'primary'}
          onClick={() => onClickInheritanceButton()}
          style={buttonStyles}
        >
          {value.state === 'inherits' ? <LinkOffIcon /> : <InsertLinkIcon />}
        </Button>
      </Tooltip>
    </Box>
  );
};

InheritanceField.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  additionalValue: PropTypes.any,
  children: PropTypes.node,
  parentId: PropTypes.string,
  currentProductData: PropTypes.object,
  field: PropTypes.string,
  additionalField: PropTypes.string,
  containerStyles: PropTypes.object,
  buttonStyles: PropTypes.object,
  buttonAction: PropTypes.func,
  isTinymce: PropTypes.bool,
  localizedLang: PropTypes.string,
};

export default InheritanceField;
