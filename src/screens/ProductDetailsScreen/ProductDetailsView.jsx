/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import ProductFiles from './SubSections/ProductFiles';

import General from './SubSections/General';
import Prices from './SubSections/Prices';
import Fulfillment from './SubSections/Fulfillment';
import Subscription from './SubSections/Subscription';
import ScrollSectionLayout from '../../components/SectionLayout/ScrollSectionLayout';
import LocalizedContent from './SubSections/LocalizedContent';
import Variations from './SubSections/Variations';

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
  sectionRefs,
  setSelectedSection,
  contents,
  resources,
  selectedSection,
  modified,
  setModified,
}) => (
  <>
    <ScrollSectionLayout
      sectionRef={sectionRefs[0]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <General
        modified={modified}
        setModified={setModified}
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={curProductData}
        parentId={parentId}
        variablesDescriptions={variablesDescriptions}
        errors={errors}
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[1]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Fulfillment
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={curProductData}
        parentId={parentId}
        errors={errors}
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[2]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Subscription
        selectOptions={selectOptions}
        setProductData={setProductData}
        currentProductData={curProductData}
        parentId={parentId}
        relatedProduct={relatedProduct}
        errors={errors}
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[3]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <LocalizedContent
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
    </ScrollSectionLayout>

    <ScrollSectionLayout
      sectionRef={sectionRefs[4]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <Prices
        modified={modified}
        setModified={setModified}
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
      />
    </ScrollSectionLayout>
    <ScrollSectionLayout
      sectionRef={sectionRefs[5]}
      setSelectedSection={setSelectedSection}
      selectedSection={selectedSection}
    >
      <ProductFiles
        productData={productData}
        currentProductData={curProductData}
        setProductData={setProductData}
        parentId={parentId}
        contents={contents}
        resources={resources}
      />
    </ScrollSectionLayout>
    {
      !parentId && (
        <ScrollSectionLayout
          sectionRef={sectionRefs[6]}
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection}
        >
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

        </ScrollSectionLayout>
      )
    }
  </>
);

ProductDetailsView.propTypes = {
  sectionRefs: PropTypes.array,
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
  descriptionData: PropTypes.object,
  parentDescriptionData: PropTypes.any,
  setDescriptionData: PropTypes.func,
  setSelectedSection: PropTypes.func,
  contents: PropTypes.array,
  resources: PropTypes.array,
  selectedSection: PropTypes.string,
  modified: PropTypes.array,
  setModified: PropTypes.func,
};

export default ProductDetailsView;
