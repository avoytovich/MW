import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { lifeTime, type } from '../../../services/selectOptions/selectOptions';
import { SelectWithChip, SelectCustom, NumberInput } from '../Inputs';

const GeneralSection = ({
  setProductData,
  currentProductData,
  selectOptions,
  inputErrors,
  setInputErrors,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({
    number: 1,
    value: '',
  });
  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);

  useEffect(() => {
    let LifeTimeNumber = false;
    const res = currentProductData.lifeTime.match(/[a-zA-Z]+|[0-9]+/g);

    if (res && res.length > 1 && res[1] !== 'DAY') {
      setLifeTimeUpdateValue({ number: res[0], value: res[1] });
      LifeTimeNumber = res[1] === 'MONTH' || res[1] === 'YEAR';
    } else if (res) {
      setLifeTimeUpdateValue({
        ...lifeTimeUpdateValue,
        value: currentProductData.lifeTime,
      });
      LifeTimeNumber = res[0] === 'MONTH' || res[0] === 'YEAR';
    } else {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: '' });
    }
    setShowLifeTimeNumber(LifeTimeNumber);
    return () => {};
  }, []);

  useEffect(() => {
    const newLifeTime = showLifeTimeNumber
      ? `${lifeTimeUpdateValue.number}${lifeTimeUpdateValue.value}`
      : lifeTimeUpdateValue.value;
    setProductData({ ...currentProductData, lifeTime: newLifeTime });
  }, [lifeTimeUpdateValue]);

  // useEffect(() => {
  //   setEditable(false);
  // }, [productData]);

  // const formStoreNames = () => {
  //   const storesArray = [];
  //   currentProductData.sellingStores.forEach((item) => {
  //     const storeName = selectOptions.sellingStores.filter(
  //       (store) => store.id === item,
  //     )[0]?.name;
  //     storesArray.push(storeName);
  //   });
  //   return storesArray.join(', ');
  // };

  return (
    <>
      <SelectCustom
        label="type"
        value={currentProductData.type}
        selectOptions={type}
        onChangeSelect={(e) => {
          setProductData({
            ...currentProductData,
            type: e.target.value,
          });
          if (inputErrors?.type) {
            const newObj = { ...inputErrors };
            delete newObj.type;
            setInputErrors(newObj);
          }
        }}
      />
      <SelectWithChip
        label="sellingStores"
        value={currentProductData.sellingStores}
        selectOptions={selectOptions.sellingStores}
        optionName={(item) => item.displayName}
        onChangeSelect={(e) => setProductData({
          ...currentProductData,
          sellingStores: e.target.value,
        })}
        onClickDelIcon={(chip) => {
          const newValue = [...currentProductData.sellingStores].filter(
            (val) => val !== chip,
          );
          setProductData({
            ...currentProductData,
            sellingStores: newValue,
          });
        }}
      />
      <SelectCustom
        label="lifeTime"
        value={lifeTimeUpdateValue.value}
        selectOptions={lifeTime}
        onChangeSelect={(e) => {
          setShowLifeTimeNumber(
            e.target.value === 'MONTH' || e.target.value === 'YEAR',
          );
          setLifeTimeUpdateValue({
            ...lifeTimeUpdateValue,
            value: e.target.value,
          });
          if (inputErrors?.lifeTime) {
            const newObj = { ...inputErrors };
            delete newObj.lifeTime;
            setInputErrors(newObj);
          }
        }}
      />
      {showLifeTimeNumber && (
        <NumberInput
          label="maxPaymentsPart"
          value={lifeTimeUpdateValue.number}
          onChangeInput={(e) => {
            setLifeTimeUpdateValue({
              ...lifeTimeUpdateValue,
              number: e.target.value,
            });
          }}
          minMAx={{ min: 1, max: 11 }}
        />
      )}
    </>
  );
};

GeneralSection.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default GeneralSection;
