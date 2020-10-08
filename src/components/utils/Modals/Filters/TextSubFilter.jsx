import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import localization from '../../../../localization';

const TextSubFilter = ({ filter, config, setConfig }) => {
  const curConfig = config[filter.id]?.exact;

  useEffect(() => {
    const newConfig = { ...config };

    if (!newConfig[filter.id]) {
      newConfig[filter.id] = { exact: false, type: 'text', label: filter.label };
      setConfig(newConfig);
    }
  }, []);

  return (
    <Button
      color={curConfig ? 'primary' : 'secondary'}
      onClick={() => setConfig({ ...config, [filter.id]: { exact: !curConfig, type: 'text', label: filter.label } })}
    >
      {curConfig ? localization.t('forms.buttons.exact') : localization.t('forms.buttons.contains')}
    </Button>
  );
};

TextSubFilter.propTypes = {
  filter: PropTypes.object,
  config: PropTypes.object,
  setConfig: PropTypes.func,
};

export default TextSubFilter;
