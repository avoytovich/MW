import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import SectionLayout from '../../../components/SectionLayout';
import AddVariationModal from '../../../components/utils/Modals/AddVariationModal';
import EditVariationModal from '../../../components/utils/Modals/EditVariationModal';
import ProductVariationsTable from './ProductVariationsTable';

import './productFile.scss';

const Variations = ({
  setProductData,
  currentProductData,
  productVariations,
  setProductDetails,
  productDetails,
  handleDeleteVariation,
  setProductLocalizationChanges,
}) => {
  const history = useHistory();
  const { id: productId } = useParams();

  const [open, setOpen] = useState(false);
  const [editableVariation, setEditableVariation] = useState(null);

  const [sortedBundledProducts, setSortedBundledProducts] = useState(null);

  const counts = {};
  const subProductsList = currentProductData?.subProducts || [];

  subProductsList.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteVariable = (field) => {
    const newAvailableVariables = currentProductData.availableVariables.filter(
      (item) => item.field !== field,
    );
    const newVariableDescriptions = productDetails.variableDescriptions.filter(
      ({ description }) => description !== field,
    );
    setProductData({
      ...currentProductData,
      availableVariables: newAvailableVariables,
    });
    setProductDetails({
      ...productDetails,
      variableDescriptions: newVariableDescriptions,
    });
    setProductLocalizationChanges(true);
  };
  useEffect(() => {
    setSortedBundledProducts(productVariations?.bundledProducts);
  }, [productVariations]);

  return productVariations?.bundledProducts ? (
    <Box display='flex' flexDirection='column' width='100%'>
      {currentProductData.id
        && (
          <ProductVariationsTable
            setSortedBundledProducts={setSortedBundledProducts}
            currentProductData={currentProductData}
            handleDeleteVariation={handleDeleteVariation}
            productVariations={productVariations}
            history={history}
            productId={productId}
            sortedBundledProducts={sortedBundledProducts}
          />
        )}
      <Box display='flex'>
        <SectionLayout label='variationParameters' width='100%'>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProductData?.availableVariables?.map((variation) => (
                  <TableRow key={variation?.field}>
                    <TableCell width='40%'>{variation?.field}</TableCell>
                    <TableCell width='40%'>{variation?.type}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        color='secondary'
                        aria-label='edit'
                        onClick={() => setEditableVariation(variation)}
                        size='large'
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color='secondary'
                        aria-label='clear'
                        onClick={() => handleDeleteVariable(variation?.field)}
                        size='large'
                      >
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box marginTop='30px'>
            <Button variant='outlined' color='primary' onClick={handleOpen}>
              Add Parameter
            </Button>
          </Box>

          <AddVariationModal
            open={open}
            onClose={handleClose}
            setProductData={setProductData}
            currentProductData={currentProductData}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
            setProductLocalizationChanges={setProductLocalizationChanges}
          />
        </SectionLayout>

        <EditVariationModal
          open={!!editableVariation}
          curVariation={editableVariation}
          onClose={() => setEditableVariation(null)}
          setProductData={setProductData}
          currentProductData={currentProductData}
          setProductDetails={setProductDetails}
          productDetails={productDetails}
          setProductLocalizationChanges={setProductLocalizationChanges}
        />
      </Box>
    </Box>
  ) : <LinearProgress />;
};
Variations.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  productVariations: PropTypes.shape({
    bundledProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
  setProductDetails: PropTypes.func,
  setProductLocalizationChanges: PropTypes.func,
  productDetails: PropTypes.object,
  handleDeleteVariation: PropTypes.func,
};

export default Variations;
