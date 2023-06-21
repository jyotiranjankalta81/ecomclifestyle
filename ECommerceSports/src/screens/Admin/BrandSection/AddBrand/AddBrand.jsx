import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./addbrand.css";
import {
  OnBoardInput,
  OneLineInput,
  PlainInput
} from "../../../../components/contactUs/PlainInput/PlainInput";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
  borderRadius: "13px",

  p: 4
};

export default function AddBrand ({ Open }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => Open(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='add_brand'>
            <h3>Add Brand Details</h3>
            <OneLineInput
              label='Brand Name:'
              type='text'
              placeholder='Enter Name:'
              name='NAME'
            />
            <OneLineInput
              label='Brand Image'
              placeholder='Enter Name'
              name='NAME'
              type='file'
            />
            <Button
              sx={{
                background: "rgb(63, 81, 181)",
                color: "#FFFFFF",
                borderRadius: "7px",
                "&:hover": {
                  backgroundColor: "rgb(63, 81, 181)"
                }
              }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
