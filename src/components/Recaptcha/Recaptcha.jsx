import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

const REACT_APP_SECRET_KEY_ONBOARD = '6LfEWpoUAAAAAIsYKy2jMa9P8Rrcb_g9aDldlvXg';

const Recaptcha = React.forwardRef(({ setCaptha }, ref) => (
  <ReCAPTCHA
    required
    sitekey={REACT_APP_SECRET_KEY_ONBOARD}
    style={{ display: 'flex', justifyContent: 'center' }}
    ref={ref}
    onChange={() => {
      setCaptha(false);
    }}
  />
));

Recaptcha.propTypes = {
  setCaptha: PropTypes.func,
};

export default Recaptcha;
