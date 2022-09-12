import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ReactComponent as UserLogo } from '../../assets/navigator/user.svg';
import { ReactComponent as PhoneLogo } from '../../assets/navigator/phone.svg';
import { ReactComponent as ProfileLogo } from '../../assets/profile/profile.svg';
import { ReactComponent as PasswordLogo } from '../../assets/profile/lock.svg';
import { NavLink } from 'react-router-dom';
import styles from './Profile.module.scss';

export default function Profile() {
  return (
    <Paper
      sx={{
        maxWidth: 252,
        width: '100%',
        padding: '24px 16px',
        height: '297px',
        borderRadius: '12px',
        boxShadow: 'none',
        background: '#fff',
      }}
      className={styles.wrapper}
    >
      <MenuList
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: 0,
        }}
        className={styles.nav_list}
      >
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <MenuItem>
            <ListItemIcon>
              <UserLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Профиль</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink
          to="/my-coupons"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <MenuItem>
            <ListItemIcon>
              <ProfileLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Мои купоны</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <MenuItem>
            <ListItemIcon>
              <PhoneLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Сменить номер</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : '')}
        >
          <MenuItem>
            <ListItemIcon>
              <PasswordLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Сменить пароль</ListItemText>
          </MenuItem>
        </NavLink>

        <Divider />
        <MenuItem>
          <ListItemText className={styles.logout}>
            Выйти из аккаунта
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
