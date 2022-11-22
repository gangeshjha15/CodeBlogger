import { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";

const Component = styled(AppBar)`
  background: #fb641b;
`;
const NavBox = styled(Box)`
  & > a {
    padding: 20px;
    text-decoration: none;
    color: #fff;
  }
`;

const StyleBox = styled(Box)``;

const logoutHandle = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

const Header = () => {
  const { account } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const child =
      name.split(" ").length > 1
        ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
        : `${name.charAt(0)}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: child,
    };
  }

  return (
    <Component>
      <Toolbar>
        <img src="" alt="" />
        <NavBox sx={{ flexGrow: 1 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </NavBox>

        <StyleBox sx={{ flexGrow: 0 }}>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar {...stringAvatar(account.name)} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/login"
                onClick={logoutHandle}
              >
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </StyleBox>
      </Toolbar>
    </Component>
  );
};

export default Header;
