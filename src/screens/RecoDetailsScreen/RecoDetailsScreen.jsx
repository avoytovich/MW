// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';

import Basic from './SubSections/Basic';
import Eligibility from './SubSections/Eligibility';
import Recommendations from './SubSections/Recommendations';
import CappingAndLimits from './SubSections/CappingAndLimits';

import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import localization from '../../localization';

import './recoDetailsScreen.scss';

const RecoDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reco, setReco] = useState(null);
  const [curReco, setCurReco] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curProducts, setProducts] = useState(null);
  const [curTab, setCurTab] = useState(0);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurReco({ ...curReco, [name]: value });
  };

  const saveIdentity = () => {
    api.updateRecoById(id, curReco).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setReco(curReco);
    });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curReco) !== JSON.stringify(reco));

    return () => setHasChanges(false);
  }, [curReco, reco]);

  useEffect(() => {
    api.getRecoById(id).then(({ data }) => {
      setReco(data);
      setCurReco(data);

      api
        .getProducts(0, `&customerId=${data.customerId}`)
        .then(({ data: { items: products } }) => {
          const productsObj = [...products.map((p) => ({ id: p.id, name: p.genericName }))];

          setProducts(productsObj);
        });
    });
  }, []);

  const updateReco = (type, value, selections) => {
    let setValue = value;

    if (!curReco[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curReco[type].indexOf(value);
      if (curValInd >= 0) {
        if (curReco[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curReco[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curReco[type], value];
      }
    }

    setCurReco((c) => ({ ...c, [type]: setValue }));
  };

  if (curReco === null) return <LinearProgress />;

  return (
    <div className="reco-details-screen">
      <CustomBreadcrumbs
        url='/marketing/recommendations'
        section={localization.t('general.recommendation')}
        id={reco?.id ? reco.id : localization.t('general.addRecommendation')}
      />

      <Box py={2}>
        <Typography gutterBottom variant="h3">{reco?.customerId}</Typography>
      </Box>
      
      <Box my={1} bgcolor="#fff">
        <Tabs
          value={curTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newTab) => setCurTab(newTab)}
        >
          <Tab label='General' />
          <Tab label='Eligibility' />
          <Tab label='Capping and limits' />
          <Tab label='Recommendations' disabled={!Array.isArray(curProducts)} />
        </Tabs>
      </Box>

      <Zoom in={hasChanges}>
        <Button
          id="save-reco-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>

      <Box pt={1}>
        {curTab === 0 && (
          <Basic
            curReco={curReco}
            updateReco={updateReco}
            handleChange={handleChange}
            setCurReco={setCurReco}
          />
        )}

        {curTab === 1 && (
          <Eligibility
            curReco={curReco}
            setCurReco={setCurReco}
            products={[...curProducts]}
          />
        )}

        {curTab === 2 && <CappingAndLimits curReco={curReco} setCurReco={setCurReco} />}

        {curTab === 3 && (
          <Recommendations
            curReco={curReco}
            setCurReco={setCurReco}
            products={[...curProducts]}
          />
        )}
      </Box>
    </div>
  );
};

export default RecoDetailsScreen;
