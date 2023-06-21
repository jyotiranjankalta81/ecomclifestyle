import { ListItemIcon } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

let activeStyle = {
  textDecoration: "none",
  background: "#3F51B5",
  borderRadius: "10px",
  width: "191px",
  height: "auto",
  color: "#FFFFFF"
};

let activeStylesub = {
  textDecoration: "none",
  background: "#3F51B5",
  borderRadius: "10px",
  width: "191px",
  height: "auto",
  color: "#FFFFFF"
};

let notActive = {
  color: "#676C84"
};

let notActivesub = {
  color: "#676C84"
};
const SubRoutes = ({ route }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className='menu'>
        <div className='menu_item'>
          <Box
            sx={{
              padding: "3px 0px 10px 20px",
            }}
          >
            <ListItem
              component={NavLink}
              style={({ isActive }) => (isActive ? activeStyle : notActive)}
              to={route.link}
              onClick={toogleMenu}
              
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText>{route.label}</ListItemText>
              <ListItemIcon>
                &nbsp; &nbsp;&nbsp;
                {isMenuOpen ? (
                  <ArrowDropDownIcon
                    sx={{
                      color: isMenuOpen ? "white" : "black",
                      marginLeft: "12px"
                    }}
                  />
                ) : (
                  <ArrowDropUpIcon
                    sx={{
                      color: isMenuOpen ? "white" : "black",
                      marginLeft: "12px"
                    }}
                  />
                )}
              </ListItemIcon>
            </ListItem>
          </Box>
          <Box sx={{margin: "0px 11px 10px 20px",border: isMenuOpen ? '0.3px solid #3F51B5' : '', borderRadius:isMenuOpen ? '10px':'', borderTop:'none'}}>
          {route.subRoutes.map((data, i) => (
            <Box
              key={i}
              sx={{
                padding: "1px 0px 8px 0px",
                display: isMenuOpen ? "block" : "none",
                 
              }}
            >
              <ListItem
                component={NavLink}
                style={({ isActive }) =>
                  isActive ? activeStylesub : notActivesub
                }
                to={data.link}
              >
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText>{data.label}</ListItemText>
              </ListItem>
            </Box>
          ))}
          </Box>
        </div>
      </div>
    </>
  );
};

export default SubRoutes;
