import React, { useEffect, useState } from "react";
import RecentOrders from "../orders/RecentOrders";
import "./adminDashboard.css";
import { observer } from "mobx-react-lite";
import DashboardStore from "../../../store/DashboardStore";
import BrandSection from "../BrandSection/BrandSection";
import { Button } from "@mui/material";
import AddBrand from "../BrandSection/AddBrand/AddBrand";
import LineChartExample from "./LineChartExample";
import Box from "@mui/material/Box";
import CountryWiseSale from "./Charts/CountryWiseSale/CountryWiseSale";
import SalesByBrand from "./Charts/SalesByBrand/SalesByBrand";
import QuaterWiseSales from "./Charts/QuaterWiseSales/QuaterWiseSales";
import SalesAmount from "./Charts/SalesAmount/SalesAmount";

const drawerWidth = 240;
const AdminDashboard = observer(() => {
  const [dashboard, setDashboard] = useState([]);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    DashboardStore.dashboard();
  }, []);

  useEffect(() => {
    setDashboard(DashboardStore.data.dashboard);
  }, [DashboardStore.data.dashboard]);

  return (
    <>
      <div className='admin_container'>
        <div className='dashboard_admin_content'>
          <div className='top_user_view'>
            <div className='item1' style={{ background: "#FE6977" }}>
              <h3 className='dashboard_heading'>Total Earning</h3>
              <span className='dashboard_item_para'>
                {dashboard?.totalEarning?.TOTAL_AMOUNT || "0"}
              </span>
            </div>
            <div className='item1' style={{ background: "#19A2FB" }}>
              <h3 className='dashboard_heading'>Total Sales</h3>
              <span className='dashboard_item_para'>
                {dashboard?.countSales}
              </span>
            </div>
            <div className='item1' style={{ background: "#74CDFF" }}>
              <h3 className='dashboard_heading'>Total Profit</h3>
              <span className='dashboard_item_para'>
                {dashboard?.totalProfit}
              </span>
            </div>
            <div className='item1' style={{ background: "#83B3C0" }}>
              <h3 className='dashboard_heading'>Total Orders</h3>
              <span className='dashboard_item_para'>
                {dashboard?.countOrder}
              </span>
            </div>
            <div className='item1' style={{ background: "#FF9066" }}>
              <h3 className='dashboard_heading'>Total Purchase</h3>
              <span className='dashboard_item_para'>
                {dashboard?.countPurches}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="chart_section">

        </div> */}
        <div className='orders_section'>
          {/* <div className="allorder">
            <span>All Order</span>
            <span>see more</span>
          </div> */}
          {/* <RecentOrders orders={dashboard?.recentOrders} /> */}
        </div>
        <div className='brand_section'>
          <br />
          <LineChartExample />
          <br />
          {/* <h3>Brand section</h3>
        <div className='brand_add_details'>
          <Button
            sx={{
              background: "rgb(63, 81, 181)",
              color: "#FFFFFF",
              borderRadius: "7px",
              "&:hover": {
                backgroundColor: "rgb(63, 81, 181)"
              }
            }}
            onClick={() => setModal(true)}
          >
            Add New Brand
          </Button>
        </div>
        <BrandSection /> */}
        </div>{" "}
        {/* {modal && <AddBrand Open={setModal} />} */}
        <div className='chart_dashboard'>
          <div className='country_wise_graph'>
            <CountryWiseSale />
          </div>
          <div className='country_wise_graph'>
            <SalesByBrand />
          </div>
        </div>
        <div className='chart_dashboard'>
          <div className='country_wise_graph'>
            <QuaterWiseSales />
          </div>
          <div className='country_wise_graph'>
            <SalesAmount />
          </div>
        </div>
      </div>
    </>
  );
});

export default AdminDashboard;
