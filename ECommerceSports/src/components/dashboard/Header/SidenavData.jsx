import * as React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import StraightenIcon from "@mui/icons-material/Straighten";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import pic from "../../../assets/nav-logo.svg";
import "./sidenavData.scss";
import { useNavigate } from "react-router-dom";
import SubRoutes from "./SubRoutes";
import FeatherIcon from "feather-icons-react";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CallIcon from "@mui/icons-material/Call";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const SidenavData = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = React.useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  const listItemData = [
    { label: "Dashobard", link: "/", icon: <GridViewRoundedIcon /> },

    {
      label: "Master",
      link: "/admin/product-management",
      icon: <ManageHistoryIcon />,
      subRoutes: [
        {
          link: "/products/category",
          label: "Category",
          icon: <CategoryIcon />
        },
        {
          link: "/products/subcategory",
          label: "SubCategory",
          icon: <CategoryOutlinedIcon />
        },
        {
          link: "/products/brand",
          label: "Brand",
          icon: <StarOutlineIcon />
        },
        {
          link: "/products/size",
          label: "Size",
          icon: <StraightenIcon />
        },
        {
          link: "/products/color",
          label: "Color",
          icon: <ColorLensIcon />
        }
      ]
    },
    {
      label: "Product",
      link: "#",
      icon: <ManageHistoryIcon />,
      subRoutes: [
        {
          label: "Add Products",
          link: "/admin/addproducts",
          icon: <AddBoxOutlinedIcon />
        },

        {
          label: "All Products",
          link: "/admin/products",
          icon: <DescriptionOutlinedIcon />
        }
      ]
    },

    {
      label: "Order",
      link: "/admin/order",
      icon: <Inventory2OutlinedIcon />
    },
    {
      label: "Cancel Order",
      link: "/admin/cancel",
      icon: <DoNotDisturbAltIcon />
    },

    {
      label: "Banners",
      link: "/banners/bannersList",
      icon: <ImageIcon />,
      subRoutes: [
        {
          link: "/banners/bannersList",
          label: "Banners",
          icon: <AddPhotoAlternateIcon />
        },
        {
          link: "/banners/addBanner",
          label: "Add Banners",
          icon: <AddPhotoAlternateIcon />
        }
      ]
    },
    { label: "Coupon", link: "admin/coupon", icon: <PercentOutlinedIcon /> },
    {
      label: "Reports",
      link: "admin/report",
      icon: <InsertChartOutlinedIcon />
    },
    {
      label: "Add User",
      link: "/admin/adduser",
      icon: <PersonAddIcon />
    },
    {
      label: "Profile",
      link: "admin/profile",
      icon: <PermIdentityRoundedIcon />
    },
    {
      label: "Contact",
      link: "/admin/contact",
      icon: <CallIcon />
    }
  ];

  let activeStyle = {
    textDecoration: "none",
    background: "#3F51B5",
    borderRadius: "10px",
    width: "191px",
    height: "auto",
    color: "#FFFFFF"
  };

  let notActive = {
    color: "#676C84",
    width: "191px"
  };
  return (
    <div style={{ width: "100%" }}>
      <Toolbar
        style={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "27px",
          color: "#3F51B5"
        }}
      >
        <img src={pic} alt='' />
        QualityCricket
      </Toolbar>
      {/* In toolbar we can give it logo */}
      <Divider />
      <List>
        {listItemData.map((item, index) => {
          if (item.subRoutes) {
            return <SubRoutes route={item} />;
          }
          return (
            <Box key={index} sx={{ padding: "3px 0px 10px 20px" }}>
              <ListItem
                component={NavLink}
                style={({ isActive }) => (isActive ? activeStyle : notActive)}
                to={item.link}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            </Box>
          );
        })}
        <Box
          sx={{
            padding: "3px 0px 10px 0px",
            width: "191px",
            marginLeft: "10px"
          }}
          onClick={logout}
        >
          <ListItem style={{ width: "191px" }}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </ListItem>
        </Box>
      </List>
    </div>
  );
};
