import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography,
} from '@mui/material';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import parentPaths from '../../../services/paths';
import './ScrollingTabs.scss';
import localization from '../../../localization';

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const ScrollingTabs = ({
  sectionRefs,
  errors,
  selectedSection,
  setSelectedSection,
  parentId,
}) => {
  const history = useHistory();
  const [showUpButton, setShowUpButton] = useState(false);

  useEffect(() => {
    if (selectedSection === sectionRefs[0].section && showUpButton) {
      setTimeout(() => {
        setShowUpButton(false);
      }, '1000');
    } else if (sectionRefs[0].section !== selectedSection && !showUpButton) {
      setShowUpButton(true);
    }
  }, [selectedSection]);

  return (
    <>
      <Box className="sticky">
        <Box display='flex'>
          {parentId && (
            <button
              type='button'
              style={{ backgroundColor: '#9ec5ec' }}
              className="backToParent_link "
              onClick={() => {
                history.push(`${parentPaths.productlist}/${parentId}`, {
                  backToParent: true,
                });
              }}
            >
              <Box display='flex'>
                <ArrowBack color='white' />
                <Typography variant='h6'>{localization.t('labels.backToParent')}</Typography>
              </Box>
            </button>
          )}
          {sectionRefs.map((it) => (
            <button
              type='button'
              style={errors?.[it.section] ? { color: 'red' } : {}}
              className={`header_link ${selectedSection === it.section ? 'selected' : ''}`}
              onClick={() => {
                scrollTo(it.ref.current);
                setSelectedSection(it.section);
              }}
            >
              <Typography variant='h6'>{localization.t(`labels.${it.section}`)}</Typography>
            </button>
          ))}
        </Box>
      </Box>
      {showUpButton && (
        <Box
          px={2}
          py={1}
          className='upButton'
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSection(sectionRefs[0].section);
            scrollTo(sectionRefs[0].ref.current);
          }}
        >
          <ArrowUpwardOutlinedIcon
            fontSize='medium'
            style={{ color: 'white' }}
          />
        </Box>
      )}
    </>
  );
};

ScrollingTabs.propTypes = {
  sectionRefs: PropTypes.array,
  errors: PropTypes.object,
  parentId: PropTypes.string,
  selectedSection: PropTypes.string,
  setSelectedSection: PropTypes.func,
};

export default ScrollingTabs;
