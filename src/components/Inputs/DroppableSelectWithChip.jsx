/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  Chip,
  TextField,
  Autocomplete, Paper,
} from '@mui/material';
import localization from '../../localization';

const DroppableSelectWithChip = ({
  label,
  value,
  selectOptions,
  onChangeSelect,
  isDisabled,
  isRequired,
  helperText,
  name,
  noTranslate,
  hasError,
}) => {
  const [curArrayOfObjects, setCurArrayOfObjects] = useState([]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    if (selectOptions.length) {
      setCurArrayOfObjects(value.map((it) => selectOptions.find((opt) => opt.id === it)
        || { id: it, value: it }));
    }
  }, [value, selectOptions]);
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
    <Autocomplete
      fullWidth
      disabled={!selectOptions || isDisabled}
      PaperComponent={({ children }) => (
        <Paper style={{ marginBottom: 10 }}>{children}</Paper>
      )}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      getOptionLabel={(option) => option?.value || ''}
      onChange={(e, newValue) => onChangeSelect(newValue.map((val) => val.id))}
      value={curArrayOfObjects}
      multiple
      id='tags-filled'
      options={selectOptions}
      clearOnBlur
      renderTags={(option, getTagProps) => (
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
                {option?.map((chip, index) => {
                  const selectedItem = selectOptions?.filter((item) => item.id === chip.id)[0];
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
                            variant='outlined'
                            {...getTagProps({ index })}

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
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          required={isRequired}
          variant='outlined'
          label={curLabel}
          error={hasError}
          helperText={helperText}
        />
      )}
    />

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
