import React from "react";
import { Dialog } from "@material-ui/core";
import EditYourAddress from "./userSetting/edityourAddress/EditYourAddress";

const Popup = (props) => {
  const { openPopup, setOpenPopup,addressData } = props;
  return (
    <Dialog open={openPopup} maxWidth="md">
      <EditYourAddress openPopup={openPopup} setOpenPopup={setOpenPopup} address={addressData} />
    </Dialog>
  );
};

export default Popup;
