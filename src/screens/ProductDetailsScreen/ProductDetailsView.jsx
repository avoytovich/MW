import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ProductFiles from './SubSections/ProductFiles';

import General from './SubSections/General';
import Prices from './SubSections/Prices';
import FulfillmentAndSubscription from './SubSections/FulfillmentAndSubscription';
import SectionLayout from '../../components/SectionLayout';
import LocalizedContent from './SubSections/LocalizedContent';
import Variations from './SubSections/Variations';
import SubProductVariations from './SubSections/SubProductVariations';

const ProductDetailsView = ({
  selectOptions,
  setProductData,
  curProductData,
  productData,
  setProductLocalizationChanges,
  productVariations,
  setProductDetails,
  productDetails,
  parentId,
  variablesDescriptions,
  storeLanguages,
  setSaveDisabled,
  setTabsDisabled,
  curTab,
}) => {
  const checkSaveDisable = () => {
    let disableSave = false;
    const { relatedContents, resources } = curProductData;

    if (relatedContents?.value?.length) {
      const [hasInvalid] = relatedContents.value.filter((v) => !v.label || !v.url);
      disableSave = disableSave || !!hasInvalid;
    }

    if (resources?.length) {
      const [hasInvalid] = resources.filter((v) => !v.label || !v.url);
      disableSave = disableSave || !!hasInvalid;
    }

    setSaveDisabled(disableSave);
  };

  useEffect(() => {
    const {
      catalogId, publisherRefId, genericName, type, prices,
    } = curProductData;

    const currency = prices?.state // eslint-disable-line
      ? prices?.state === 'inherits'
        ? prices?.parentValue?.priceByCountryByCurrency[prices?.parentValue?.defaultCurrency]
          ?.default?.value
        : prices?.value?.priceByCountryByCurrency[prices?.value?.defaultCurrency]?.default
          ?.value
      : prices?.defaultCurrency;

    if (catalogId && publisherRefId && genericName && type && currency) {
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
            parentId={parentId}
          />
        </SectionLayout>
      )}
      {curTab === 1 && (
        <SectionLayout dataTest='fulfillmentAndSubscription' label='fulfillmentAndSubscription'>
          <FulfillmentAndSubscription
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
          />
        </SectionLayout>
      )}
      {curTab === 2 && (
        <SectionLayout dataTest='localizedContent' label='localizedContent'>
          <LocalizedContent
            storeLanguages={storeLanguages}
            setProductData={setProductData}
            currentProductData={curProductData}
            productData={productData}
            setNewData={setProductLocalizationChanges}
            parentId={parentId}
          />
        </SectionLayout>
      )}
      {curTab === 3 && (
        <SectionLayout dataTest='prices' label='prices'>
          <Prices
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            productData={productData}
            setNewData={setProductLocalizationChanges}
            setSaveDisabled={setSaveDisabled}
            parentId={parentId}
          />
        </SectionLayout>
      )}
      {curTab === 4 ? ( // eslint-disable-line
        parentId ? (
          <SubProductVariations
            setProductData={setProductData}
            setProductDetails={setProductDetails}
            currentProductData={curProductData}
            productDetails={productDetails}
            productVariations={productVariations}
            parentId={parentId}
            selectOptions={selectOptions}
            variablesDescriptions={variablesDescriptions}
          />
        ) : (
          <Variations
            selectOptions={selectOptions}
            setProductData={setProductData}
            currentProductData={curProductData}
            productVariations={productVariations}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
          />
        )
      ) : null}
      {curTab === 5 && (
        <SectionLayout dataTest='productFiles' label='productFiles'>
          <ProductFiles
            productData={productData}
            currentProductData={curProductData}
            setProductData={setProductData}
            setSaveDisabled={setSaveDisabled}
          />
        </SectionLayout>
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
  setProductDetails: PropTypes.func,
  productDetails: PropTypes.object,
  parentId: PropTypes.string,
  productData: PropTypes.object,
  variablesDescriptions: PropTypes.array,
  storeLanguages: PropTypes.array,
  curTab: PropTypes.number,
  setSaveDisabled: PropTypes.func,
  setTabsDisabled: PropTypes.func,
};

export default ProductDetailsView;
