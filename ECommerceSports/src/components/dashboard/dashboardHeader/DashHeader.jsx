import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import pic from "../../../assets/Rectangle6.png";
import styles from "./dashheader.module.css";

const DashHeader = () => {
  return (
    <>
      <div className={styles.header_sec}>
        <div>
          <h1 className={styles.add}></h1>
        </div>
        <div className={styles.header_sec_comp}>
          <form className={styles.user_input}>
            <input type={"search"} placeholder='Search' />
            <button type='submit' className={styles.search_icon}>
              {" "}
              <SearchIcon
                color='white'
                size={"15px"}
                className={styles.search_icon}
              />
            </button>
          </form>
          <div className={styles.user_id}>
            <img src={pic} />
            <p style={{ color: "#3F51B5" }}>Admin</p>
            <ArrowDropDownOutlinedIcon color='#3F51B5' />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashHeader;
