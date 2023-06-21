import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import "./add-discount.style.scss";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../store/ProductStore";
import { toast } from "react-toastify";
const DiscountPopup = (props) => {
  const { openPopup, setOpenPopup, param } = props;
  const [inputDiscount, setInputDiscount] = useState();

  const handleChange = (e) => {
    setInputDiscount(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputDiscount) {
      toast.warn("Please enter discount value");
      return
    }
    let data = {
      "PRODUCT_DISCOUNT": inputDiscount,
      "PRODUCT_ID": param.PRODUCT_ID,
      "PRODUCT_DISCOUNTSTATUS": true
    }
    ProductStore.updateProductDiscount(data, navigationCallBackDelete)
  };
  const navigationCallBackDelete = () => {
    ProductStore.getProduct()
    setInputDiscount("")
    setOpenPopup(false);
  }
  return (
    <Dialog open={openPopup} maxWidth="md">
      <section className="Edit-Section">
        <div className="discounttag">
          <h1>Add Discount</h1>
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon style={{ fontSize: '27px', }} />{" "}
          </span>
        </div>
        <div className="form-container">
          <label htmlFor="">Add Discount % off</label> <br />
          <input
            type="number"
            min="10" max="99"
            id="discount"
            required
            name="discount"
            value={inputDiscount}
            onChange={handleChange}
            placeholder="Enter discount % off"
          />
          <div className="discountsavebtn">
            <button type="submit" className="pointer" onClick={() => handleSubmit()}>Save</button>
          </div>
        </div>
      </section>
    </Dialog>
  );
};

export default DiscountPopup;
