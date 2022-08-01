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
  duplicateParamsByScope, sections, beforeSendFormate, keyName, requiredFields,
} from './utils';
import getExtraData from './extraData';
import localization from '../../../localization';
import { InputCustom } from '../../Inputs';
import '../../TableComponent/TableComponent.scss';
import './duplicatePopup.scss';

const DuplicatePopup = ({
  scope, duplicatedData, open, setOpen,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [inputValues, setInputValues] = useState({ [keyName[scope]]: '' });
  const [attributes, setAttributes] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setInputValues({ [keyName[scope]]: '', [keyName[scope]]: `Copy of ${duplicatedData?.[keyName[scope]]}` });
    const curSections = { ...sections[scope] };
    if (scope === 'productlist' && !duplicatedData?.hasChildren) {
      delete curSections.productVariations;
    }
    setAttributes(curSections);
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
      .then(async ({ data }) => {
        newObject = { ...data };
        const additionalData = await duplicateParamsByScope[scope].api.additional?.get(data);
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
          ...inputValues,
        };

        const checkData = beforeSendFormate(scope, sendObj);
        duplicateParamsByScope[scope].api.post(checkData, additionalData, attributes, data)
          .then((res) => {
            const headersLocation = res.headers.location.split('/');
            const newId = headersLocation[headersLocation.length - 1];
            const detailsPath = location.pathname;
            toast(localization.t('general.updatesHaveBeenSaved'));
            history.push(`${detailsPath}/${newId}`);
          });
      });
  };
  useEffect(() => {
    if (requiredFields[scope]) {
      const newErrors = { ...errors };
      requiredFields[scope].forEach((field) => {
        if (!inputValues?.[field]) {
          newErrors[field] = localization.t('errorNotifications.isRequired');
        } else if (newErrors[field]) {
          delete newErrors[field];
        }
      });
      setErrors(newErrors);
    }
  }, [inputValues]);

  useEffect(() => {
    if (duplicateParamsByScope[scope].validation) {
      const additionalErrors = duplicateParamsByScope[scope].validation({ attributes });
      if (additionalErrors) {
        setErrors((e) => ({ ...e, additionalErrors }));
      } else if (errors.additionalErrors) {
        const newErrors = { ...errors };
        delete newErrors.additionalErrors;
        setErrors(newErrors);
      }
    }
  }, [attributes]);

  const contentHeader = `${localization.t('labels.duplicate')} ${duplicatedData?.[keyName[scope]]}?`;
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText color="inherit">
            <Box py={2} minWidth='370px'>
              {contentHeader}
            </Box>
            <Box py={2}>
              <InputCustom
                label='name'
                value={inputValues[keyName[scope]]}
                onChangeInput={(e) => setInputValues(
                  { ...inputValues, [keyName[scope]]: e.target.value },
                )}
              />
            </Box>
            {getExtraData(
              scope,
              duplicatedData,
              (obj) => { setInputValues({ ...inputValues, ...obj }); },
              inputValues,
            )}
            {errors?.additionalErrors && <Box className='notification'>{errors?.additionalErrors}</Box>}
            <Box>
              <Box py={2}>
                {localization.t('general.duplicateNextSections')}
                :
              </Box>
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
                      label={formLabel}
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
          <Button onClick={handleDuplicate} color="primary" disabled={!!Object.keys(errors).length}>
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
