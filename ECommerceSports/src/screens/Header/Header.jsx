import React, { useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import navLogo from "../../assets/nav-logo.png";
import "./header.scss";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { Dialog, Paper } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import avatarimg from "./image-avatar.png";
import { secondaryColor } from "../../utils/colorVariables";
import { useState } from "react";
import AuthStore from "../../store/AuthStore";
import { observer } from "mobx-react-lite";
import HomeStore from "../../store/HomeStore";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import Autocomplete from "@mui/material/Autocomplete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ProductStore from "../../store/ProductStore";
// import Dialog from '@mui/material/Dialog';
import Modal from "@mui/material/Modal";
// import SearchIcon from '@mui/icons-material/Search';

import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import SearchPopup from "./SearchPopup/SearchPopup";

const navItems = [
  {
    name: "Home",
    href: "/"
  },
  // {
  //   name: "Sale",
  //   href: "/sale"
  // },
  {
    name: "Accessories",
    href: "/accessories"
  },
  {
    name: "All Products",
    href: "/products"
  }
  // {
  //   name: "Contact Us",
  //   href: "/contact"
  // },
  // {
  //   name: "Balls",
  //   href: "/faq"
  // },
  // {
  //   name: "Bat",
  //   href: "/about"
  // }
];

const StyledBadge = styled(BadgeUnstyled)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: 'Inter',IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 10%;
    right: 10%;
    display: grid;
    place-content: center;
    aspect-ratio:1;
    height: 1rem;
    color: #fff;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    background: ${secondaryColor};
    border-radius: 2px;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `
);

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft,": {
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    border: "2px solid #3f51b5",
    borderRadius: "7px",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  }
}));

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" }
];

const Header = observer(({ setopendashboard }) => {
  var name;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [yourAccount, setYourAccount] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opensearch, setOpenSearch] = useState(false);
  const handleCloses = () => setOpenSearch(false);

  const [opens, setOpens] = React.useState(false);
  const handleOpen = () => setOpens(true);
  // const handleCloses = () => setOpens(false);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let role = localStorage.getItem("role");
    name = localStorage.getItem("name");
    HomeStore.getCarts();
    if (token) {
      AuthStore.login(null, email, role, token);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setCartCount(HomeStore?.data?.carts?.length);
  }, [HomeStore.data.carts]);

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
    setYourAccount(!yourAccount);
  };

  const logoutsession = () => {
    swal({
      title: "Do you really want to signout?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        localStorage.clear();
        window.location.reload();
      }
    });
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleAdmin = () => {
    setopendashboard(true);
    navigate("/");
  };
  const gotoCartPage = () => {
    navigate("/product/checkout");
  };

  const CartPage = () => {
    navigate("/home/cart");
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        let param = {
          product: searchTerm
        };
        ProductStore.searchProducts(param, navigationCallBack);
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const navigationCallBack = data => {
    setSearchList(data);
  };
  const handleSearch = event => {
    setSearchTerm(event);
  };

  const handleSuggestionClick = (event, value) => {
    let product = searchList.find(x => x.PRODUCT_NAME === value);
    navigate("/products/items", { state: { item: product } });
  };

  return (
    <>
      <div className='top_header'>
        <div className='item6'>Gurrented safe and Secure Delivery.</div>
        <div className='item2'>
          100% Price Gurrented - found a better price else where?whatsApp to +91
          9845155785 We will beat it!
        </div>
        <div className='item3'>Toll Free 1800 105 8580</div>
        <div className='item4'>
          <img src='/Images/Footer/facebook.png' alt='' />
          <img src='/Images/Footer/instagram.png' alt='' />
          <img src='/Images/Footer/twitter.png' alt='' />
          <img src='/Images/Footer/whatsapp.png' alt='' />
        </div>
        <div className='item5'>
          <p>
            <Link
              to='/contact'
              style={{ listStyle: "none", textDecoration: "none" }}
            >
              Contact
            </Link>
          </p>
          <p>
            <Link
              to='/faq'
              style={{ listStyle: "none", textDecoration: "none" }}
            >
              FAQ's
            </Link>
          </p>
        </div>
      </div>
      <nav className='nav-container'>
        {/* <div className='safe_delivery'>
        <img src='/Images/FastDelivery/delivery.jfif' alt='' />
      </div> */}
        <div className='nav'>
          <button
            className='mobile-menu-icon'
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? (
              <i>
                <FeatherIcon icon='x' />
              </i>
            ) : (
              <i>
                <FeatherIcon icon='menu' />
              </i>
            )}{" "}
          </button>
          <Link to='/' className='navbar_logo'>
            <img src={navLogo} alt='logo' />
          </Link>
          <ul
            className={isMobile ? "nav-items nav-links-mobile" : "nav-items"}
            onClick={() => setIsMobile(false)}
          >
            {navItems.map(item => {
              return (
                <NavLink
                  to={item.href}
                  key={item.name}
                  className={({ isActive }) =>
                    isActive ? "active-nav nav-item" : "nav-item"
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}

            <div className='search_bars'>
              <div className='search_bar'>
                <input
                  type='search'
                  className='search_input'
                  onClick={() => setOpenSearch(true)}
                />
                <div className='search_icon'>
                  <SearchIcon size='medium' sx={{}} />
                </div>
              </div>
              {opensearch && <SearchPopup open={setOpenSearch} />}
            </div>
          </ul>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            disableScrollLock={true}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button"
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  // right: 5,
                  width: 10,
                  // border: "2px solid red",
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0
                }
              }
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to='/'
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  color: "#000000"
                }}
              >
                Sale
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to='/products'
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  color: "#000000"
                }}
              >
                All Products
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to='/'
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  color: "#000000"
                }}
              >
                Accessories
              </Link>
            </MenuItem>
          </Menu>
          <div className='nav-action'>
            {isLoggedIn ? (
              <Box
                sx={{
                  display: "flex"
                  // display: { md: "flex", lg: "flex", sm: "flex" }
                  // gap: "0.2rem"
                }}
              >
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                  onClick={() => setNotificationCount(prev => prev + 1)}
                >
                  <StyledBadge badgeContent={notificationCount || "0"}>
                    <NotificationsNoneOutlinedIcon
                      sx={{
                        height: 27,
                        width: 25,
                        display: "grid",
                        placeContent: "center"
                      }}
                    />
                  </StyledBadge>
                </IconButton>
                <IconButton onClick={() => gotoCartPage()}>
                  <StyledBadge badgeContent={cartCount || "0"}>
                    <ShoppingCartOutlinedIcon
                      sx={{
                        height: 27,
                        width: 25,
                        display: "grid",
                        placeContent: "center"
                      }}
                    />
                  </StyledBadge>
                </IconButton>
                <Box
                  sx={{
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "6.4px",
                    overflow: "hidden"
                  }}
                >
                  <Tooltip title='Open settings' className='pointer'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt='Remy Sharp' src={avatarimg} />
                    </IconButton>
                  </Tooltip>
                  <p className='user_name pointer' onClick={handleOpenUserMenu}>
                    {name || "Guest"}
                  </p>
                  <Menu
                    sx={{ mt: "1rem" }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    disableScrollLock={true}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 5,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0
                        }
                      }
                    }}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/account' style={{ textDecoration: "none" }}>
                        <Typography textAlign='center'>My Account</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/order' style={{ textDecoration: "none" }}>
                        <Typography textAlign='center'>Your Order</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/address' style={{ textDecoration: "none" }}>
                        <Typography textAlign='center'>Your Address</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to='/loginsecurity'
                        style={{ textDecoration: "none" }}
                      >
                        <Typography textAlign='center'>
                          Login Security
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to='/contact' style={{ textDecoration: "none" }}>
                        <Typography textAlign='center'>Contact Us</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={logoutsession}>
                      <Typography textAlign='center'>Log Out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            ) : (
              <>
                <Link to='/login'>
                  {AuthStore.data.token ? (
                    <button className='login-btn'>Sign Out</button>
                  ) : (
                    <button className='login-btn'>Sign In</button>
                  )}
                </Link>
              </>
            )}
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  );
});

export default Header;
