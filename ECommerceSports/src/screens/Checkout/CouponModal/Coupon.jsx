import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Coupon.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "7px",
  p: 4
};

export default function Coupon () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <section className='coupon-Section'>
            <div className='-div'>
              <h2> Coupon Addition </h2>

              <form action=''>
                <label htmlFor=''>Coupon ID:</label> <br />
                <input
                  type='text'
                  id='fname'
                  name='firstname'
                  placeholder=' Prana Shukla '
                />
                <br />
                <label htmlFor=''>Coupon Image:</label> <br />
                <input
                  type='file'
                  style={{ border: "none", outline: "none" }}
                  id='fname'
                  name='firstname'
                  //   placeholder='6325632563'
                />
                <br />
                <label htmlFor=''>Coupon Code:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='BH2869930257HF4558'
                />
                <br />
                <label htmlFor=''>Coupon Minprice:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='500'
                />
                <br />
                <label htmlFor=''>Coupon Maxdiscount:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='2500'
                />
                <br />
                <label htmlFor=''>Coupon Discount Percent:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='15%'
                />
                <br />
                <label htmlFor=''>Coupon Min Order:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='Enter Coupon Count here'
                />
                <br />
                <label htmlFor=''>Coupon Validity</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='Enter Expairy Date here'
                />
                <br />
                <label htmlFor=''>Coupon Expire:</label>
                <br />
                <input
                  type='email'
                  id='fname'
                  name='firstname'
                  placeholder='Enter date here'
                />
                <br />
                <br />
                <button className='coupon-Btn'>Save</button>
              </form>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
