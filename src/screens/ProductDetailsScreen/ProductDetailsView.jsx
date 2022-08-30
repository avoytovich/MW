import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ProductFiles from './SubSections/ProductFiles';

import General from './SubSections/General';
import Prices from './SubSections/Prices';
import Fulfillment from './SubSections/Fulfillment';
import Subscription from './SubSections/Subscription';
import SectionLayout from '../../components/SectionLayout';
import LocalizedContent from './SubSections/LocalizedContent';
import Variations from './SubSections/Variations';
import SubProductVariations from './SubSections/SubProductVariations';
import { checkValue } from '../../services/helpers/dataStructuring';

const ProductDetailsView = ({
  selectOptions,
  setProductData,
  curProductData,
  productData,
  relatedProduct,
  setProductLocalizationChanges,
  productVariations,
  setSubProductVariations,
  setProductDetails,
  productDetails,
  parentId,
  variablesDescriptions,
  storeLanguages,
  setSaveDisabled,
  setTabsDisabled,
  curTab,
  setCodeMode,
  codeMode,
  jsonIsValid,
  setJsonIsValid,
  setPriceTableError,
  priceTableError,
  handleDeleteVariation,
  digitsErrors,
  setDigitsErrors,
  curLocalizedData,
  setCurLocalizedData,
  descriptionData,
  setDescriptionData,
  parentDescriptionData,
  localizedErrors,
  setLocalizedErrors,
  errors,
  setErrors,
}) => {
  const checkSaveDisable = () => {
    const {
      relatedContents, resources, lifeTime, subscriptionTemplate,
    } = curProductData;

    let disableSave = !!(lifeTime === 'PERMANENT' && subscriptionTemplate);

    const rcChecked = checkValue(relatedContents);
    const resourceChecked = checkValue(resources);

    if (rcChecked?.value?.length) {
      const [hasInvalid] = rcChecked.value.filter((v) => !v.label || !v.url);
      disableSave = disableSave || !!hasInvalid;
    }

    if (resourceChecked?.length) {
      const [hasInvalid] = resourceChecked.filter((v) => !v.label || !v.url);
      disableSave = disableSave || !!hasInvalid;
    }

    setSaveDisabled(disableSave);
  };

  useEffect(() => {
    const {
      catalogId, publisherRefId, genericName, type, prices, priceByCountryByCurrency,
    } = curProductData;
    const currency = prices?.state ? prices.value.defaultCurrency !== '' : prices.defaultCurrency !== '';

    const byCountryByCurrency = priceByCountryByCurrency.state
      ? Object.keys(priceByCountryByCurrency.value).length > 0
      : Object.keys(priceByCountryByCurrency).length > 0;

    if (catalogId
      && publisherRefId
      && genericName
      && type
      && byCountryByCurrency && currency) {
      setTabsDisabled(false);
    } else {
      setTabsDisabled(true);
    }

    checkSaveDisable();
  }, [curProductData]);

  return (
    <>
      {curTab === 0 && (
        <SectionLayout dataTest='general' label='general'>
          <General
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            setSaveDisabled={setSaveDisabled}
            parentId={parentId}
            variablesDescriptions={variablesDescriptions}
            errors={errors}
            setErrors={setErrors}
          />
        </SectionLayout>
      )}

      {curTab === 1 && (
        <SectionLayout dataTest='fulfillment' label='fulfillment'>
          <Fulfillment
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            parentId={parentId}
          />
        </SectionLayout>
      )}

      {curTab === 2 && (
        <SectionLayout dataTest='subscription' label='subscription'>
          <Subscription
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            parentId={parentId}
            relatedProduct={relatedProduct}
          />
        </SectionLayout>
      )}

      {curTab === 3 && (
        <SectionLayout dataTest='localizedContent' label='localizedContent'>
          <LocalizedContent
            localizedErrors={localizedErrors}
            setLocalizedErrors={setLocalizedErrors}
            curLocalizedData={curLocalizedData}
            setCurLocalizedData={setCurLocalizedData}
            storeLanguages={storeLanguages}
            setProductData={setProductData}
            currentProductData={curProductData}
            productData={productData}
            parentId={parentId}
            setCodeMode={setCodeMode}
            codeMode={codeMode}
            jsonIsValid={jsonIsValid}
            setJsonIsValid={setJsonIsValid}
            descriptionData={descriptionData}
            parentDescriptionData={parentDescriptionData}
            setDescriptionData={setDescriptionData}
          />
        </SectionLayout>
      )}

      {curTab === 4 && (
        <SectionLayout dataTest='prices' label='prices'>
          <Prices
            digitsErrors={digitsErrors}
            setDigitsErrors={setDigitsErrors}
            priceTableError={priceTableError}
            setPriceTableError={setPriceTableError}
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            productData={productData}
            setNewData={setProductLocalizationChanges}
            parentId={parentId}
            errors={errors}
            setErrors={setErrors}
          />
        </SectionLayout>
      )}

      {curTab === 5 && ( // eslint-disable-line
        <SectionLayout dataTest='productFiles' label='productFiles'>
          <ProductFiles
            productData={productData}
            currentProductData={curProductData}
            setProductData={setProductData}
            setSaveDisabled={setSaveDisabled}
            parentId={parentId}
          />
        </SectionLayout>
      )}

      {curTab === 6 && (
        parentId ? (
          <SubProductVariations
            setProductData={setProductData}
            setProductDetails={setProductDetails}
            currentProductData={curProductData}
            productDetails={productDetails}
            setSubProductVariations={setSubProductVariations}
            // productVariations={productVariations}
            parentId={parentId}
            selectOptions={selectOptions}
            variablesDescriptions={variablesDescriptions}
          />
        ) : (
          <Variations
            handleDeleteVariation={handleDeleteVariation}
            setSubProductVariations={setSubProductVariations}
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            productVariations={productVariations}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
            setProductLocalizationChanges={setProductLocalizationChanges}
          />
        )
      )}
    </>
  );
};

ProductDetailsView.propTypes = {
  setProductData: PropTypes.func,
  curProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  setProductLocalizationChanges: PropTypes.func,
  productVariations: PropTypes.object,
  setSubProductVariations: PropTypes.func,
  setProductDetails: PropTypes.func,
  productDetails: PropTypes.object,
  parentId: PropTypes.string,
  productData: PropTypes.object,
  variablesDescriptions: PropTypes.array,
  storeLanguages: PropTypes.array,
  curTab: PropTypes.number,
  setSaveDisabled: PropTypes.func,
  setTabsDisabled: PropTypes.func,
  setCodeMode: PropTypes.func,
  codeMode: PropTypes.bool,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
  relatedProduct: PropTypes.object,
  setPriceTableError: PropTypes.func,
  priceTableError: PropTypes.array,
  handleDeleteVariation: PropTypes.func,
  digitsErrors: PropTypes.object,
  setDigitsErrors: PropTypes.func,
  curLocalizedData: PropTypes.object,
  setCurLocalizedData: PropTypes.func,
  localizedErrors: PropTypes.object,
  setLocalizedErrors: PropTypes.func,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  descriptionData: PropTypes.object,
  parentDescriptionData: PropTypes.any,
  setDescriptionData: PropTypes.func,
};

export default ProductDetailsView;
