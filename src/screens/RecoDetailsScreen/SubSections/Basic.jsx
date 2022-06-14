import React, { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import store from '../../../redux/store';
import { setTempRecoLocales } from '../../../redux/actions/TempData';
import { checkValue } from '../../../services/helpers/dataStructuring';
import localization from '../../../localization';
import TinyEditor from '../../../components/TinyEditor/TinyProductEditor';
import { SelectCustom } from '../../../components/Inputs';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import CustomCard from '../../../components/utils/CustomCard';

const Basic = ({
  curReco,
  updateReco,
  handleChange,
  setCurReco,
}) => {
  const [value, setValue] = useState(curReco.fallbackLocale || 0);
  const [availLocales, setAvailLocales] = useState(Object.keys(curReco?.localizedDesc || []));
  const [newLangValue, setNewLangValue] = useState('');

  const dispatch = useDispatch();
  const i18nFieldsReco = useSelector(
    ({ tempData }) => tempData.i18nFieldsReco,
  ) || curReco.localizedDesc;

  const availableLocales = getLanguagesOptions();

  const getSortedLocales = () => {
    const first = checkValue(curReco?.fallbackLocale);

    // eslint-disable-next-line no-nested-ternary
    return availLocales.sort((x, y) => (x === first ? -1 : y === first ? 1 : 0)) || [];
  };

  const makeNewData = (locale) => {
    const { tempData } = store.getState();
    const dataToSave = {
      localizedDesc: {
        ...tempData?.i18nFieldsReco,
        ...curReco?.localizedDesc,
      },
    };
    dataToSave.localizedDesc[locale || value] = '';

    setAvailLocales(() => [...Object.keys(dataToSave?.localizedDesc)]);
    dispatch(setTempRecoLocales({ ...dataToSave.localizedDesc }));
  };

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    const { tempData } = store.getState();

    const dataToSave = {
      i18nFieldsReco: {
        ...tempData?.i18nFieldsReco,
        ...curReco?.i18nFields,
      },
    };

    delete dataToSave.i18nFieldsReco[locale];

    setAvailLocales(() => Object.keys(dataToSave.i18nFieldsReco).filter((l) => l !== locale));
    dispatch(setTempRecoLocales({ ...dataToSave.i18nFieldsReco }));

    if (value === locale) {
      setValue(0);
    }
  };

  const addLocale = (defLanguage) => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        makeNewData(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    } else if (defLanguage) {
      const languageIndex = availLocales.indexOf(defLanguage);

      if (languageIndex < 0) {
        makeNewData(defLanguage);
        setValue(defLanguage);
      } else {
        setValue(defLanguage);
      }
    }
  };

  useEffect(() => {
    setCurReco({
      ...curReco,
      localizedDesc: i18nFieldsReco,
    });
  }, [i18nFieldsReco]);

  return curReco && (
    <CustomCard mt={0}>
      <Box mx={2} py={1} display='flex' alignItems='center'>
        <Typography variant='h5'>
          {`${localization.t(
            'labels.status',
          )} *`}
        </Typography>

        <Box display='flex' alignItems='center' ml={4}>
          <FormControlLabel
            control={(
              <Switch
                color='primary'
                checked={curReco.status === 'ENABLED'}
                name='status'
              />
            )}
            onChange={() => updateReco(
              'status',
              curReco.status === 'ENABLED' ? 'DISABLED' : 'ENABLED',
            )}
            label={
              curReco.status === 'ENABLED'
                ? localization.t('labels.enabled')
                : localization.t('labels.disabled')
            }
          />
        </Box>
      </Box>

      <Box display='flex' py={5} pb={2}>
        <Box px={1} width=' 100%'>
          <TextField
            required
            fullWidth
            label={localization.t('labels.recommendationName')}
            name='name'
            type='text'
            value={curReco.name}
            onChange={handleChange}
            variant='outlined'
          />
        </Box>
      </Box>

      <Box display='flex'>
        <Box px={1} py={3} width='100%' maxWidth='200px'>
          <TextField
            fullWidth
            label={localization.t('labels.weight')}
            name='weight'
            type='number'
            value={curReco.weight}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
            variant='outlined'
          />
        </Box>

        <Box px={1} width='100%' py={3}>
          <SelectCustom
            label='fallbackLocale'
            onChangeSelect={(e) => setCurReco({ ...curReco, fallbackLocale: e.target.value })}
            selectOptions={availableLocales}
            value={curReco.fallbackLocale || ''}
          />
        </Box>
      </Box>

      <Box display='flex' width='100%' m={2} pb={2}>
        <Typography gutterBottom variant='h5'>
          {localization.t('labels.recomendationDescription')}
        </Typography>
      </Box>
      <Box display='flex' m={2} pb={2}>
        <Box display='flex' width='100%'>
          <Box width='20%'>
            <Tabs
              orientation='vertical'
              indicatorColor='primary'
              variant='scrollable'
              value={value}
              style={{ borderRight: '1px solid #e2e2e2', height: '100%' }}
              onChange={(e, newTab) => setValue(newTab)}
              aria-label='Localizations'
            >
              {getSortedLocales().map((locale) => (
                <Tab
                  label={`${locale}${locale === curReco?.fallbackLocale || (curReco?.fallbackLocale?.state === 'inherits' ? locale === curReco?.fallbackLocale?.parentValue : locale === curReco?.fallbackLocale?.value)
                    ? ' (default)'
                    : ''
                  }`}
                  key={locale}
                  value={locale}
                  component={forwardRef(({ children, ...props }, ref) => (
                    <div role='button' {...props} ref={ref}>
                      <span className='localization-label'>{children}</span>
                      {(locale !== curReco?.fallbackLocale && (curReco?.fallbackLocale?.state === 'inherits' ? locale !== curReco?.fallbackLocale?.parentValue : locale !== curReco?.fallbackLocale?.value)) && (
                        <ClearIcon onClick={(e) => removeLocale(e, locale)} />
                      )}
                    </div>
                  ))}
                />
              ))}

              <Tab
                label='Add Language'
                value={0}
                component={forwardRef(({ children, ...props }, ref) => (
                  <div role='button' {...props} style={{ minWidth: '100%' }} ref={ref}>
                    <SelectCustom
                      label='addLanguage'
                      value={newLangValue}
                      selectOptions={availableLocales}
                      onChangeSelect={(e) => setNewLangValue(e.target.value)}
                    />

                    <div hidden>{children}</div>
                    <AddCircleIcon
                      color='primary'
                      style={{
                        marginLeft: 15,
                        opacity: !newLangValue ? 0.3 : 1,
                        pointerEvents: !newLangValue ? 'none' : 'auto',
                      }}
                      onClick={addLocale}
                    />
                  </div>
                ))}
              />
            </Tabs>
          </Box>

          <Box display='flex' flexDirection='row' alignItems='baseline' width='80%'>
            <Box width='50%' pl={4}>
              {!!value && (
                <TinyEditor
                  data={curReco?.localizedDesc}
                  curLocal={value}
                  isDefault={value === curReco?.fallbackLocale
                    || value === curReco?.fallbackLocale?.value}
                  defaultLocale={curReco?.fallbackLocale?.value || curReco?.fallbackLocale}
                  reco
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display='flex' m={2} pb={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            {localization.t('labels.type')}
          </Typography>

          <Box>
            <RadioGroup
              row
              aria-label='Type'
              name='Type'
              value={curReco.type}
              onChange={(e) => updateReco('type', e.target.value)}
            >
              <FormControlLabel
                value='CROSS_SELL'
                control={<Radio color='primary' />}
                label={localization.t('labels.crossSell')}
              />
              <FormControlLabel
                value='UP_SELL'
                control={<Radio color='primary' />}
                label={localization.t('labels.upSell')}
              />
              <FormControlLabel
                value='UPGRADE'
                control={<Radio color='primary' />}
                label={localization.t('labels.upgrade')}
              />
            </RadioGroup>
          </Box>
        </div>
      </Box>

      <Box display='flex' m={2} pb={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            Level(s)
          </Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Checkbox
                  name='PRODUCT'
                  color='primary'
                  checked={curReco?.levels?.indexOf('PRODUCT') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'PRODUCT', 'multiple')}
              label={localization.t('labels.product')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='CART'
                  color='primary'
                  checked={curReco?.levels?.indexOf('CART') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'CART', 'multiple')}
              label={localization.t('labels.cart')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='INTERSTITIAL'
                  color='primary'
                  checked={curReco?.levels?.indexOf('INTERSTITIAL') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'INTERSTITIAL', 'multiple')}
              label={localization.t('labels.interstitial')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='PURCHASE'
                  disabled
                  color='primary'
                  checked={curReco?.levels?.indexOf('PURCHASE') >= 0}
                />
              )}
              // onClick={updateReco('levels', 'PURCHASE', 'multiple')}
              label={localization.t('labels.purchase')}
            />
          </Box>
        </div>
      </Box>

      <Box display='flex' m={2}>
        <div>
          <Typography gutterBottom variant='h5'>
            {localization.t('labels.sources')}
          </Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Checkbox
                  name='MANUAL_RENEWAL'
                  color='primary'
                  checked={curReco?.sources?.indexOf('MANUAL_RENEWAL') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'MANUAL_RENEWAL', 'empty')}
              label={localization.t('labels.manualRenewal')}
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name='PURCHASE'
                  color='primary'
                  checked={curReco?.sources?.indexOf('PURCHASE') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'PURCHASE', 'empty')}
              label={localization.t('labels.purchase')}
            />
          </Box>

          <Typography style={{ fontStyle: 'italic' }}>
            {localization.t('general.selectNoSourceMeans')}
          </Typography>
        </div>
      </Box>
    </CustomCard>
  );
};

Basic.propTypes = {
  curReco: PropTypes.object,
  updateReco: PropTypes.func,
  handleChange: PropTypes.func,
  setCurReco: PropTypes.func,
};

export default Basic;
