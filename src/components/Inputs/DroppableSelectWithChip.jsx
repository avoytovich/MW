/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  MenuItem,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';
import localization from '../../localization';

const DroppableSelectWithChip = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  onClickDelIcon,
  isDisabled,
  isRequired,
  isMultiple = true,
  helperText,
  name,
  noTranslate,
  hasError,
}) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      value,
      result.source.index,
      result.destination.index,
    );
    onChangeSelect(items);
  };

  const curLabel = noTranslate ? label : label ? localization.t(`labels.${label}`) : null;

  return (
    <TextField
      fullWidth
      error={hasError}
      select
      name={name}
      data-test={label}
      label={curLabel}
      SelectProps={{
        placeholder: 'Write here...',
        multiple: isMultiple,
        value: selectOptions ? value : [],
        onChange: (e) => onChangeSelect(e.target.value),
        renderValue: (selected) => (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  tabIndex={name}
                  role='button'
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  ref={provided.innerRef}
                  style={{
                    display: 'flex', flexDirection: 'row', overflow: 'auto',
                  }}

                  {...provided.droppableProps}
                >
                  {selected?.map((chip, index) => {
                    const selectedItem = selectOptions?.filter((item) => item.id === chip)[0];
                    return (
                      <Draggable
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        key={selectedItem?.id || chip}
                        draggableId={selectedItem?.id || chip}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Chip
                              onMouseDown={(e) => {
                                e.stopPropagation();
                              }}
                              variant='outlined'
                              onDelete={() => onClickDelIcon(chip)}

                              label={selectedItem?.value || chip}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ),
        MenuProps: {
          getContentAnchorEl: null,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          transformOrigin: { vertical: 'top', horizontal: 'center' },
        },
      }}
      disabled={!selectOptions || isDisabled}
      required={isRequired}
      variant='outlined'
      helperText={helperText}
      InputProps={{
        startAdornment: !selectOptions && (
          <InputAdornment>
            <CircularProgress />
          </InputAdornment>
        ),
      }}
    >
      {
        selectOptions?.length ? (
          selectOptions.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.value}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>{localization.t('general.noAvailableOptions')}</MenuItem>
        )
}
    </TextField>
  );
};

DroppableSelectWithChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  isDisabled: PropTypes.bool,
  selectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  onClickDelIcon: PropTypes.func,
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool,
  helperText: PropTypes.string,
  name: PropTypes.string,
  noTranslate: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default DroppableSelectWithChip;
