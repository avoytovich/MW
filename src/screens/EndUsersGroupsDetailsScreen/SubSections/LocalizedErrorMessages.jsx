
import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Typography,
} from '@mui/material';
import localization from '../../../localization';

const LocalizedErrorMessages = ({ errors }) => (
  <Box pl='20%' pt={2}>
    {errors.defaultLocalizedContent && (
      <Box px={4} pb={1}>
        <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
          {`${errors.defaultLocalizedContent.length > 1 ? localization.t('labels.fields') : localization.t('labels.field')} ${errors.defaultLocalizedContent.join(', ')} ${localization.t('errorNotifications.forDefaultLanguageCanNotBeEmpty')}`}
        </Typography>
      </Box>
    )}
    {errors.localizedContent && (
      <Box px={4} pb={1}>
        <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
          {`Field Short Description for ${errors.localizedContent.join(', ')} is required`}
        </Typography>
      </Box>
    )}
    {errors.localizedLogo && (
      <Box px={4} pb={1}>
        <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
          {`${localization.t('forms.inputs.localizedContent.localizedLogo')} for ${errors.localizedLogo.join(', ')} is not valid`}
        </Typography>
      </Box>
    )}
    {errors.bannerImageUrl && (
      <Box px={4} pb={1}>
        <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
          {`${localization.t('forms.inputs.localizedContent.bannerImageUrl')} for ${errors.bannerImageUrl.join(', ')} is not valid`}
        </Typography>
      </Box>
    )}
    {errors.bannerLinkUrl && (
      <Box px={4} pb={1}>
        <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
          {`${localization.t('forms.inputs.localizedContent.bannerLinkUrl')} for ${errors.bannerLinkUrl.join(', ')} is not valid`}
        </Typography>
      </Box>
    )}
  </Box>

);

LocalizedErrorMessages.propTypes = {
  errors: PropTypes.object,
};

export default LocalizedErrorMessages;
