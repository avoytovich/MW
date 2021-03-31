import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@material-ui/core';

import api from '../../../api';

import CustomCard from '../../../components/utils/CustomCard';

const Eligibility = ({
  curReco,
  setCurReco,
  products,
}) => {
  const [curStores, setCurStores] = useState(null);

  useEffect(() => {
    if(!curReco) return;

    api
      .getStores(0, `&customerId=${curReco?.customerId}`)
      .then(({ data: { items: stores } }) => {
        const storesObj = [...stores.map((s) => ({ id: s.id, name: s.name }))];

        setCurStores(storesObj);
      });
  }, []);

  return (
    <CustomCard>
      <Box display="flex" py={2} mx={1} flexDirection='column'>
        {curStores === null ? (
          <Box width={1} m="10px" pt="8px">
            <CircularProgress />
          </Box>
        ) : (
          <Box width='100%' className='outlined-stores'>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-stores">
                Stores *
              </InputLabel>

              <Select
                name='stores'
                inputProps={{
                  name: 'stores',
                  id: 'outlined-stores',
                }}
                label='Stores *'
                multiple
                value={curStores?.filter((s) => curReco?.eligibleStoreIds?.indexOf(s.id) >= 0)}
                variant='outlined'
                renderValue={(selected) => (
                  <Box
                    display='flex'
                    alignItems='center'
                    flexDirection='row'
                    flexWrap='wrap'
                  >
                    {selected.map((chip) => (
                      <Chip
                        variant='outlined'
                        color='primary'
                        onDelete={() => setCurReco((c) => ({ ...c, eligibleStoreIds: c.eligibleStoreIds.filter((s) => s !== chip.id) }))}
                        onMouseDown={(event) => event.stopPropagation()}
                        key={chip?.id}
                        label={chip?.name}
                      />
                    ))}
                  </Box>
                )}
              >
                {curStores
                  .filter((pr) => !curReco?.eligibleStoreIds || curReco?.eligibleStoreIds?.indexOf(pr.id) < 0)
                  .map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}
                      onClick={() => setCurReco((c) => ({ ...c, eligibleStoreIds: [...c.eligibleStoreIds, item.id] }))}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {products === null ? (
          <Box width={1} m="10px" pt="8px">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box width='100%' className='outlined-products' my={2} mt={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-products">
                  By product
                </InputLabel>

                <Select
                  name='byProduct'
                  inputProps={{
                    name: 'byProduct',
                    id: 'outlined-products',
                  }}
                  label='By product'
                  multiple
                  value={products?.filter((s) => curReco?.eligibleProductIds?.indexOf(s.id) >= 0)}
                  variant='outlined'
                  renderValue={(selected) => (
                    <Box
                      display='flex'
                      alignItems='center'
                      flexDirection='row'
                      flexWrap='wrap'
                    >
                      {selected.map((chip) => (
                        <Chip
                          variant='outlined'
                          color='primary'
                          onDelete={() => setCurReco((c) => ({ ...c, eligibleProductIds: c.eligibleProductIds.filter((s) => s !== chip.id) }))}
                          onMouseDown={(event) => event.stopPropagation()}
                          key={chip?.id}
                          label={chip?.name}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {products
                    .filter((pr) => !curReco?.eligibleProductIds || curReco?.eligibleProductIds?.indexOf(pr.id) < 0)
                    .map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        onClick={() => setCurReco((c) => ({ ...c, eligibleProductIds: [...c.eligibleProductIds, item.id] }))}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

            <Box width='100%' className='outlined-parent-products' my={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-parent-products">
                  By parent products
                </InputLabel>

                <Select
                  name='byParentProducts'
                  inputProps={{
                    name: 'byParentProducts',
                    id: 'outlined-parent-products',
                  }}
                  label='By parent products'
                  multiple
                  value={products?.filter((s) => curReco?.eligibleParentProductIds?.indexOf(s.id) >= 0)}
                  variant='outlined'
                  renderValue={(selected) => (
                    <Box
                      display='flex'
                      alignItems='center'
                      flexDirection='row'
                      flexWrap='wrap'
                    >
                      {selected.map((chip) => (
                        <Chip
                          variant='outlined'
                          color='primary'
                          onDelete={() => setCurReco((c) => ({ ...c, eligibleParentProductIds: c.eligibleParentProductIds.filter((s) => s !== chip.id) }))}
                          onMouseDown={(event) => event.stopPropagation()}
                          key={chip?.id}
                          label={chip?.name}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {products
                    .filter((pr) => !curReco?.eligibleParentProductIds || curReco?.eligibleParentProductIds?.indexOf(pr.id) < 0)
                    .map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        onClick={() => setCurReco((c) => ({ ...c, eligibleParentProductIds: [...c.eligibleParentProductIds, item.id] }))}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Box>
    </CustomCard>
  );
};

Eligibility.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  products: PropTypes.array,
};

export default Eligibility;
