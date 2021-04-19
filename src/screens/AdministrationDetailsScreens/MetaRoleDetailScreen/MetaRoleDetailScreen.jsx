import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, Zoom, Button } from '@material-ui/core';

import SelectCustomerNotification from '../../../components/utils/SelectCustomerNotification';
import { requiredFields, structureSelectOptions } from './utils';
import localization from '../../../localization';
import { SelectWithChip, InputCustom } from '../../../components/Inputs';
import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';

const MetaRoleDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [update, setUpdate] = useState(0);

  const [metaRole, setMetaRole] = useState(null);
  const [curMetaRole, setCurMetaRole] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    roles: null,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleSave = () => {
    if (id === 'add') {
      api.addNewMetaRole(curMetaRole).then((res) => {
        const location = res.headers.location.split('/');
        const id = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push(`/settings/administration/metaRoles/${id}`);
        setUpdate((u) => u + 1);
      });
    } else {
      api.updateMetaRoleById(id, curMetaRole).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        setUpdate((u) => u + 1);
      });
    }
  };

  useEffect(() => {
    let metaRole;
    if (id === 'add') {
      metaRole = Promise.resolve({
        data: { customerId: nxState.selectedCustomer.id },
      });
    } else {
      metaRole = api.getMetaRoleById(id);
    }
    metaRole.then(({ data }) => {
      const checkedMetaRole = requiredFields(data);
      setMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
      setCurMetaRole(JSON.parse(JSON.stringify(checkedMetaRole)));
    });
    api.getRoles().then(({ data }) =>
      setSelectOptions({
        ...selectOptions,
        roles: structureSelectOptions(data.items) || [],
      }),
    );
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curMetaRole) !== JSON.stringify(metaRole));

    return () => setHasChanges(false);
  }, [curMetaRole]);

  if (curMetaRole === null) return <LinearProgress />;

  if (id === 'add' && !nxState.selectedCustomer.id)
    return <SelectCustomerNotification />;

  return (
    <div>
      <Zoom in={hasChanges}>
        <Button
          disabled={!curMetaRole.name}
          id='save-metaRole-button'
          color='primary'
          size='large'
          type='submit'
          variant='contained'
          onClick={handleSave}
        >
          {localization.t('general.save')}
        </Button>
      </Zoom>
      <InputCustom
        label='reasonForCurrentChange'
        value={curMetaRole.reason}
        onChangeInput={(e) =>
          setCurMetaRole({ ...curMetaRole, reason: e.target.value })
        }
        isRequired
      />
      <InputCustom
        label='name'
        value={curMetaRole.name}
        onChangeInput={(e) =>
          setCurMetaRole({ ...curMetaRole, name: e.target.value })
        }
        isRequired
      />
      <SelectWithChip
        label='aggregatedRoles'
        value={curMetaRole.roleIds}
        selectOptions={selectOptions.roles}
        onChangeSelect={(e) =>
          setCurMetaRole({
            ...curMetaRole,
            roleIds: e.target.value,
          })
        }
        onClickDelIcon={(chip) => {
          const newValue = [...curMetaRole.roleIds].filter(
            (val) => val !== chip,
          );
          setCurMetaRole({
            ...curMetaRole,
            roleIds: newValue,
          });
        }}
      />
    </div>
  );
};

export default MetaRoleDetailScreen;
