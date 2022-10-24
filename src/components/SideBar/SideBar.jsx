import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Drawer,
  List,
  ListItem,
  IconButton,
  Typography,
} from '@mui/material';
import PermIdentity from '@mui/icons-material/PermIdentity';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import HandleSearchSection from './HandleSearchSection';
import NavItem from './NavItem';
import CollapsableNav from './CollapsableNav';
import CustomerHandling from '../CustomerHandling';
import LogoHome from '../utils/LogoHome';
import navConfig from './config';
import useSessionCountDown from '../../services/hooks/useSessionCountDown';
import localization from '../../localization';
import './SideBar.scss';

const NavItems = ({ config }) => config.items.map((item) => <NavItem key={item.id} {...item} />);

const SideBar = ({ toggleDrawer, open }) => {
  const [inputValue, setInputValue] = useState('');
  const [curNavConfig, setCurNavConfig] = useState(navConfig);
  const [openAllSections, setOpenAllSections] = useState(false);

  const timer = useSessionCountDown();

  const handleUpdateValue = (value) => {
    const searchValue = value.toLowerCase();
    setInputValue(value);
    if (value) {
      const newConfig = [];
      navConfig.forEach((item) => {
        const newItems = [];
        item.items.forEach(((subItem) => {
          if (subItem.title.toLocaleLowerCase().includes(searchValue)) {
            newItems.push(subItem);
          }
        }));
        if (newItems.length) {
          newConfig.push({ ...item, items: newItems });
        }
      });
      setCurNavConfig(newConfig);
      setOpenAllSections(true);
    } else {
      setCurNavConfig(navConfig);
      setOpenAllSections(false);
    }
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        className='side-bar'
        PaperProps={{
          style: {
            marginTop: process?.env?.ENV_MODE === 'production' ? 0 : '25px',
          },
        }}
      >
        <Box height="fit-content" display="flex" flexDirection="column">
          <Box
            height="inherit"
            display="flex"
            flexDirection="column"
            className='side-nav'
            px={2}
          >
            <Box display='flex' flexDirection='row'>
              <LogoHome wrapperHeight={64} height={32} width={107} />
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                style={{ color: timer ? 'green' : 'red' }}
              >
                <PermIdentity />
                {timer}
              </Box>
              <IconButton
                edge='start'
                aria-label='menu'
                color='secondary'
                onClick={toggleDrawer}
                size='large'
              >
                <NavigateBeforeIcon color='primary' />
              </IconButton>
            </Box>
            <Box mx='-5px'>
              <HandleSearchSection
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleUpdateValue={handleUpdateValue}
              />
            </Box>
            <Box mx='-5px'><CustomerHandling /></Box>
            <Box
              display="flex"
              flexDirection="column"
              height={1}
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flexDirection="column"
                width={236}
                className='side-nav-block'
              >
                {curNavConfig.length ? (
                  <List>
                    {curNavConfig.map((config) => (
                      <ListItem key={config.subheader || config?.items[0]?.id} disableGutters>
                        {config.subheader ? (
                          <CollapsableNav
                            openAllSections={openAllSections}
                            header={config.subheader}
                            icon={config.subheaderIcon}
                          >
                            <NavItems config={config} />
                          </CollapsableNav>
                        ) : <NavItems config={config} />}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box mx='auto' pt={2}>
                    <Typography style={{ color: '#f3f3f3' }}>{localization.t('errorNotifications.nothingFound')}</Typography>
                  </Box>
                )}
              </Box>

            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

SideBar.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
};

export default SideBar;
