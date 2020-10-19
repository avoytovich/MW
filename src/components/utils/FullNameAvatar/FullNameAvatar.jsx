import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

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
      width={54}
      minWidth={54}
      height={54}
      borderRadius='50%'
      lineHeight='54px'
      mr={2}
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
