import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const FullNameAvatar = ({ name }) => {
  const getNameAvatar = () => {
    const [firstName, lastName] = name.split(' ');

    return firstName.charAt(0) + lastName.charAt(0);
  };

  return (
    <Box
      bgcolor='primary.main'
      color='#fff'
      textAlign='center'
      width={44}
      minWidth={44}
      height={44}
      borderRadius='50%'
      lineHeight='44px'
      my='4px'
      style={{ textTransform: 'uppercase' }}
    >
      {getNameAvatar()}
    </Box>
  );
};

FullNameAvatar.propTypes = {
  name: PropTypes.string,
};

export default FullNameAvatar;
