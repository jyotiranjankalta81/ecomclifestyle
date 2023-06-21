import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { SidenavData } from "./SidenavData";
import DashHeader from "../dashboardHeader/DashHeader";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AdminBreadCrump from "./HeaderBredCrump/AdminBreadCrump";

const drawerWidth = 250;

export default function AdminHeader (props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Nav header ka hai ye */}
        <CssBaseline />
        <AppBar
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px - 25px)` },
            // width: "auto",
            ml: { sm: `${drawerWidth}px` },
            marginTop: "10px",
            paddingRight: "1rem",
            paddingLeft: "1rem",
            marginRight: "15px",
            // border: "2px solid green",
            borderRadius: "17px",
            // mr: 3,
            height: "auto",
            background: "white",
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            // alignItems: "flex-end"
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Appbar, jo dashboardheader ko contain kra hai */}
          <div className='bred_crump'>
            <AdminBreadCrump />
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "center"
            }}
          >
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ ml: 1, display: { sm: "none" } }}
            >
              <MenuIcon
                sx={{
                  color: "black",
                  // border: "2px solid black",
                  borderRadius: "4px",
                  transform: "scale(1.3)"
                }}
              />
            </IconButton>
            {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> 
          <Navbar/>
        </Toolbar> */}
            <DashHeader />
          </div>
        </AppBar>
        <Box
          component='nav'
          sx={{
            width: { sm: drawerWidth },
            height: "auto",
            flexShrink: { sm: 0 }
          }}
          aria-label='mailbox folders'
        >
          {/* Ye Logo container box hai */}
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none", md: "none" },
              overflow: "hidden",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth
              }
            }}
          >
            {/* {drawer} */}
            <SidenavData />
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", sm: "block" },
              overflow: "hidden",
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                borderRadius: "0px 17px 17px 0px",
                width: drawerWidth,
                boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.15)",
                background: "#FFFFFF"
              }
            }}
            open
          >
            {/* {drawer} */}
            <SidenavData />
          </Drawer>
        </Box>

        {/*  For Dashboard */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            //   p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}
AdminHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};
