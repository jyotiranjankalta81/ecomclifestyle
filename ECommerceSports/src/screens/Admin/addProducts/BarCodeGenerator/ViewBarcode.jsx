// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { BarcodeGenerator } from "./BarcodeGenerator";
// import { height } from "@mui/system";
// import Barcode from "react-barcode";

// const style = {
//   // position: "absolute",
//   // top: "50%",
//   // left: "50%",
//   // transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   // border: "2px solid #000",
//   borderRadius: "7px",
//   boxShadow: 24,
//   p: 4
// };

// export const ViewBarcode = ({ OpenModals }) => {
//   const handleClose = () => OpenModals(!OpenModals);
//   console.log(OpenModals);

//   return (
//     <div
//       style={{
//         outline: "none",
//         border: "5px solid red"
//       }}
//     >
//       <Modal
//         open={OpenModals}
//         onClose={handleClose}
//         // aria-labelledby='modal-modal-title'
//         // aria-describedby='modal-modal-decription'
//         sx={{
//           backround: "red",
//           border: "12px solid green",
//           width: "70%",
//           height: "70%"
//         }}
//       >
//         <Box sx={style}>
//           {/* <BarcodeGenerator /> */}
//           <Barcode value='QC824552253252IN' />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function ViewBarcode ({ OpenModals }) {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => OpenModals(false);

  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        // keepMounted
        open={OpenModals}
        onClose={handleClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='keep-mounted-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          {/* <button onClick={() => OpenModals(false)}>close</button> */}
        </Box>
      </Modal>
    </>
  );
}
