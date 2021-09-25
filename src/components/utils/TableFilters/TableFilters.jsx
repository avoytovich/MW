import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import {
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import {
  Close as CloseIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

import FilterBlock from './FilterBlock';

import { setFilters, setFilterViews } from '../../../redux/actions/TableData';

import availableFilters from '../../../services/useData/tableMarkups/filters';
import localization from '../../../localization';

import './tableFilters.scss';

const Filters = ({ scope, onClose }) => {
  const dispatch = useDispatch();
  const [newFiltersConfig, setNewConfig] = useState({});
  const [isAddingNew, setAddingNew] = useState(false);
  const [isEditingView, setEditingView] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');
  const [selectedView, setSelectedView] = useState('');

  const filtersConfig = useSelector(({ tableData: { filters } }) => filters[scope]);

  const filterViewsConfig = useSelector(({ tableData: { filterViews } }) => filterViews[scope]);

  const updateFiltersConfig = (id, newData) => {
    const newConfig = { ...newFiltersConfig };

    newConfig[id] = newData;

    if (!newData) {
      delete newConfig[id];
    }

    setNewConfig(newConfig);
  };

  useEffect(() => {
    const [sameView] = filterViewsConfig?.length
      ? filterViewsConfig?.filter(
        (i) => JSON.stringify(i.config) === JSON.stringify(filtersConfig),
      ) : [];

    if (sameView) {
      setSelectedView(sameView.name);
    } else {
      setNewConfig({ ...filtersConfig });
    }
  }, [filtersConfig]);

  useEffect(() => {
    if (selectedView) {
      const [viewConfig] = filterViewsConfig?.length
        ? filterViewsConfig?.filter((i) => i.name === selectedView) : [];

      if (viewConfig?.config) {
        setNewConfig(viewConfig.config);
      }
    }
  }, [selectedView]);

  const applyFilters = () => {
    onClose();
    dispatch(setFilters({ [scope]: newFiltersConfig }));
  };

  const clearFilters = () => setNewConfig({});

  const addNewFilter = () => {
    const [withSameName] = filterViewsConfig?.length
      ? filterViewsConfig?.filter((i) => i.name === newFilterName) : [];

    if (withSameName) {
      toast.warning('Filter with same name already exists!');
    } else {
      const prevViews = filterViewsConfig?.length ? filterViewsConfig : [];

      dispatch(setFilterViews({
        [scope]: [...prevViews, { name: newFilterName, config: newFiltersConfig }],
      }));

      setAddingNew(false);
      setSelectedView(newFilterName);
      setNewFilterName('');
    }
  };

  const saveView = () => {
    if (selectedView) {
      const prevView = filterViewsConfig?.length > 0 ? filterViewsConfig
        .filter((i) => i.name !== selectedView) : [];

      dispatch(setFilterViews({
        [scope]: [
          ...prevView,
          { name: selectedView, config: newFiltersConfig },
        ],
      }));
    }

    setIsChanging(false);
  };

  const removeView = (e, name) => {
    e.stopPropagation();

    dispatch(setFilterViews({
      [scope]: filterViewsConfig.filter((i) => i.name !== name),
    }));

    setSelectedView('');
  };

  const editView = (e, name) => {
    e.stopPropagation();

    setEditingView(name);
    setNewFilterName(name);
  };

  const editFilterName = () => {
    if (selectedView === isEditingView) {
      setSelectedView(newFilterName);
    }

    dispatch(setFilterViews({
      [scope]: filterViewsConfig.map((i) => {
        if (i.name === isEditingView) {
          return { ...i, name: newFilterName };
        }

        return i;
      }),
    }));

    setNewFilterName('');
    setEditingView(false);
  };

  return (
    <>
      <Paper className='filters-modal' elevation={3}>
        <Box p={3} height={1} display='flex' flexDirection='column' maxHeight='564px'>
          <Box mb='15px' display='flex' justifyContent='space-between'>
            <Typography variant='h6'>{localization.t('general.filters')}</Typography>

            <Box color='primary' style={{ cursor: 'pointer' }} onClick={() => setIsChanging(true)}>
              <Typography variant='h6' color='primary'>{localization.t('general.saveView')}</Typography>
            </Box>
          </Box>

          <Select
            variant='outlined'
            fullWidth
            value={selectedView}
            style={{ marginBottom: '20px', maxHeight: '50px' }}
            onChange={(e) => {
              if (e.target.value === '#add') {
                setAddingNew(true);
              } else {
                setSelectedView(e.target.value);
              }
            }}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <Typography color='secondary' variant='h6'>Select a view</Typography>;
              }

              return selected;
            }}
          >
            <MenuItem value='#add' key='#add'><Typography color='primary' variant='h6'>Add new view</Typography></MenuItem>
            {
              filterViewsConfig?.length > 0 && filterViewsConfig.map((view) => (
                <MenuItem value={view.name} key={view.name}>
                  <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Typography variant='h6'>{view.name}</Typography>
                    <Box alignItems='center' display='flex'>
                      <EditIcon style={{ color: '#b9b1b1', fontSize: '20px' }} onClick={(e) => editView(e, view.name)} />
                      <CloseIcon style={{ color: '#b9b1b1' }} onClick={(e) => removeView(e, view.name)} />
                    </Box>
                  </Box>
                </MenuItem>
              ))
            }
          </Select>

          <Divider />

          <Box className='filters-inputs-container' display='flex' flexDirection='column' flexGrow='1' py='10px' pr='25px'>
            {availableFilters[scope].map((filter) => (
              <FilterBlock
                data={filter}
                curData={newFiltersConfig[filter.id]}
                updateConfig={updateFiltersConfig}
                key={filter.id}
              />
            ))}
          </Box>

          <Divider />

          <Box display='flex' justifyContent='space-between' alignItems='center' mt='15px'>
            <Box color='primary' style={{ cursor: 'pointer' }} onClick={clearFilters}>
              <Typography variant='h6' color='primary'>{localization.t('general.clearFilters')}</Typography>
            </Box>

            <Button variant='contained' color='primary' onClick={applyFilters}>{localization.t('forms.buttons.apply')}</Button>
          </Box>
        </Box>
      </Paper>

      <Dialog
        fullWidth
        className='filters-add-modal'
        open={isAddingNew}
        PaperProps={{ style: { maxWidth: '485px' } }}
        onClose={() => setAddingNew(false)}
        closeAfterTransition
      >
        <DialogContent>
          <Typography variant='h5' color='textPrimary' style={{ marginBottom: '10px' }}>
            {localization.t('general.addFilterView')}
          </Typography>

          <TextField
            value={newFilterName}
            fullWidth
            variant='outlined'
            placeholder='Enter the name'
            onChange={(e) => setNewFilterName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setAddingNew(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={addNewFilter}>Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        className='filters-edit-modal'
        open={isEditingView}
        PaperProps={{ style: { maxWidth: '485px' } }}
        onClose={() => { setEditingView(false); setNewFilterName(''); }}
        closeAfterTransition
      >
        <DialogContent>
          <Typography variant='h5' color='textPrimary' style={{ marginBottom: '10px' }}>
            {localization.t('general.editFilterView')}
          </Typography>

          <TextField
            value={newFilterName}
            fullWidth
            variant='outlined'
            placeholder='Enter the name'
            onChange={(e) => setNewFilterName(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => { setEditingView(false); setNewFilterName(''); }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={editFilterName}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        open={isChanging}
        PaperProps={{ style: { maxWidth: '485px' } }}
        onClose={() => setIsChanging(false)}
        closeAfterTransition
      >
        <DialogContent>
          <Typography variant='h5' color='textPrimary' style={{ marginBottom: '10px' }}>
            {`${localization.t('general.applyChangesTo')} ${selectedView}?`}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={() => setIsChanging(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={saveView}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Filters.propTypes = {
  scope: PropTypes.string,
  onClose: PropTypes.func,
};

export default Filters;
