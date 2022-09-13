import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ReactComponent as UserLogo } from "../../assets/navigator/user.svg";
import { ReactComponent as PhoneLogo } from "../../assets/navigator/phone.svg";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

export default function Navigation({ ...props }) {
  return (
    <Paper
      sx={{
        // maxWidth: 252,
        width: "30%",
        padding: "24px 16px",
        height: "160px",
        borderRadius: "12px",
        boxShadow: "none",
        background: "#fff",
      }}
      className={styles.wrapper}
    >
      <MenuList
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: 0,
        }}
        className={styles.nav_list}
      >
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <MenuItem>
            <ListItemIcon>
              <UserLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>О нас</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <MenuItem>
            <ListItemIcon>
              <PhoneLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Контакты</ListItemText>
          </MenuItem>
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          <MenuItem>
            <ListItemIcon>
              <UserLogo className={styles.activeIcon} />
            </ListItemIcon>
            <ListItemText>Помощь</ListItemText>
          </MenuItem>
        </NavLink>
      </MenuList>
    </Paper>
  );
}
