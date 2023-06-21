import * as React from "react";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation } from "react-router-dom";

export default function AdminBreadCrump () {
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  //   const history = useHistory()
  //   history.location.pathname
  console.log(location.pathname);

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  return (
    // <MemoryRouter initialEntries={["/"]} initialIndex={0}>
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       width: 360,
    //       border: "3px solid green"
    //     }}
    //   >
    //     {/* <Routes>
    //       <Route path='*' element={<Page />} />
    //     </Routes> */}
    //     <Box
    //       sx={{
    //         bgcolor: "background.paper",
    //         mt: 1
    //       }}
    //       component='nav'
    //       aria-label='mailbox folders'
    //     >
    //       <List>
    //         <ListItemLink to='/' open={open} onClick={handleClick} />
    //         <Collapse component='li' in={open} timeout='auto' unmountOnExit>
    //           <List disablePadding>
    //             <ListItemLink sx={{ pl: 4 }} to='/inbox/important' />
    //           </List>
    //         </Collapse>
    //         <ListItemLink to='/trash' />
    //         <ListItemLink to='/spam' />
    //       </List>
    //     </Box>
    //   </Box>
    // </MemoryRouter>
    <Breadcrumbs aria-label='breadcrumb'>
      <Link underline='hover' color='inherit' href='/'>
        Dashboard
      </Link>

      <Link underline='hover' color='inherit' href={location.pathname}>
        {location.pathname}
      </Link>
    </Breadcrumbs>
  );
}
