import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
import useScroolWithTabs from './hooks/useScroolWithTabs';

import './productDetailsScreen.scss';

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
  setCurTab,
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
  refTab,
  refScrool,
  isScroolUp,
  isScroolDown,
  errors,
  setErrors,
}) => {
  const checkSaveDisable = () => {
    const {
      relatedContents, resources, lifeTime, subscriptionTemplate,
    } = curProductData;

    let disableSave = !!(lifeTime.name === 'PERMANENT' && subscriptionTemplate);

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

  const [showTopBtn, goToTop] = useScroolWithTabs(
    refScrool, curTab, setCurTab, isScroolUp, isScroolDown, refTab, parentId,
  );

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
      <SectionLayout
        dataTest='general'
        label='general'
        myRef={refTab[0]}
      >
        <General
          myRef={refScrool[0]}
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
      <SectionLayout
        dataTest='fulfillment'
        label='fulfillment'
        myRef={refTab[1]}
      >
        <Fulfillment
          myRef={refScrool[1]}
          selectOptions={selectOptions}
          setProductData={setProductData}
          currentProductData={curProductData}
          parentId={parentId}
        />
      </SectionLayout>
      <SectionLayout
        dataTest='subscription'
        label='subscription'
        myRef={refTab[2]}
      >
        <Subscription
          myRef={refScrool[2]}
          selectOptions={selectOptions}
          setProductData={setProductData}
          currentProductData={curProductData}
          parentId={parentId}
          relatedProduct={relatedProduct}
        />
      </SectionLayout>
      <SectionLayout
        dataTest='localizedContent'
        label='localizedContent'
        myRef={refTab[3]}
      >
        <LocalizedContent
          myRef={refScrool[3]}
          errors={errors}
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
      <SectionLayout
        dataTest='prices'
        label='prices'
        myRef={refTab[4]}
      >
        <Prices
          myRef={refScrool[4]}
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
      <SectionLayout
        dataTest='productFiles'
        label='productFiles'
        myRef={refTab[5]}
      >
        <ProductFiles
          myRef={refScrool[5]}
          productData={productData}
          currentProductData={curProductData}
          setProductData={setProductData}
          setSaveDisabled={setSaveDisabled}
          parentId={parentId}
        />
      </SectionLayout>
      {curTab === 5 && parentId ? null : (parentId ? (
        <SubProductVariations
          myRefTab={refTab[6]}
          myRefScroll={refScrool[6]}
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
          myRefTab={refTab[6]}
          myRefScroll={refScrool[6]}
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
      ))}
      <Box m={2} className='top-to-btm'>
        {showTopBtn && (
          <ArrowUpwardIcon
            className='icon-position icon-style'
            onClick={goToTop}
          />
        )}
      </Box>
    </>
  );
};

ProductDetailsView.propTypes = {
  refTab: PropTypes.array,
  refScrool: PropTypes.array,
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
  setCurTab: PropTypes.func,
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
  isScroolDown: PropTypes.bool,
  isScroolUp: PropTypes.bool,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  descriptionData: PropTypes.object,
  parentDescriptionData: PropTypes.any,
  setDescriptionData: PropTypes.func,
};

export default ProductDetailsView;
