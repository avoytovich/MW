import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import {
  duplicateParamsByScope, sections, beforeSendFormate, keyName,
} from './utils';
import localization from '../../../localization';
import { InputCustom } from '../../Inputs';
import '../../TableComponent/TableComponent.scss';

const DuplicatePopup = ({
  scope, duplicatedData, open, setOpen,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [attributes, setAttributes] = useState({});
  useEffect(() => {
    setInputValue(`Copy of ${duplicatedData?.[keyName[scope]]}`);
    setAttributes({ ...sections[scope] });
  }, [duplicatedData, scope]);
  const handleChange = (event) => {
    setAttributes({
      ...attributes,
      [event.target.name]: event.target.checked,
    });
  };
  const handleDuplicate = async () => {
    let newObject = {};
    duplicateParamsByScope[scope].api.get(duplicatedData?.id)
      .then(({ data }) => {
        newObject = { ...data };
        duplicateParamsByScope[scope].needsToBeDeleted.forEach((i) => {
          delete newObject[i];
        });
        Object.keys(attributes).forEach((attrKey) => {
          if (!attributes[attrKey]) {
            duplicateParamsByScope[scope].sections[attrKey].forEach((sectionKey) => {
              delete newObject[sectionKey];
            });
          }
        });
        const sendObj = {
          ...duplicateParamsByScope[scope].requiresFields,
          ...newObject,
          name: inputValue,
        };
        const checkData = beforeSendFormate(scope, sendObj);
        duplicateParamsByScope[scope].api.post(checkData).then((res) => {
          const headersLocation = res.headers.location.split('/');
          const newId = headersLocation[headersLocation.length - 1];
          const detailsPath = location.pathname;
          toast(localization.t('general.updatesHaveBeenSaved'));
          history.push(`${detailsPath}/${newId}`);
        });
      });
  };
  const contentHeader = `${localization.t('labels.duplicate')} ${duplicatedData?.[keyName[scope]]}?`;
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            <Box py={2}>
              {contentHeader}
            </Box>
            <Box py={2}>
              <InputCustom
                label='name'
                value={inputValue}
                onChangeInput={(e) => setInputValue(e.target.value)}
              />
            </Box>
            <Box>
              <FormGroup>
                {Object.keys(attributes).map((key) => {
                  const formLabel = localization.t(`labels.${key}`);
                  return (
                    <FormControlLabel
                      key={key}
                      control={(
                        <Checkbox
                          checked={attributes[key]}
                          name={key}
                          color="primary"
                        />
                      )}
                      onChange={handleChange}
                      label={`${localization.t('labels.duplicate')} ${formLabel} ${localization.t('labels.attributes')}`}
                    />
                  );
                })}
              </FormGroup>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {localization.t('labels.cancel')}
          </Button>
          <Button onClick={handleDuplicate} color="primary">
            {localization.t('labels.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DuplicatePopup.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  id: PropTypes.string,
  scope: PropTypes.string,
  duplicatedData: PropTypes.object,
};

export default DuplicatePopup;
