import React from "react";
import filterIcon from "./001-edit.svg";
import "./FilterStyle.scss";
import FilterList from "../../components/filtercomponent/FilterList";
import FilterListIcon from "@mui/icons-material/FilterList";

const Filterproduct = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <section className='filter-section'>
      {/* <img src={filterIcon} alt='' style={{ marginLeft: "6px" }} /> */}
      <span className='filter-head'>
        <FilterListIcon sx={{ color: "#3f51b5" }} />
        &nbsp; FILTERS
      </span>
      <div className='filter-group'>
        <FilterList {...props} />
      </div>
    </section>
  );
};

export default Filterproduct;
