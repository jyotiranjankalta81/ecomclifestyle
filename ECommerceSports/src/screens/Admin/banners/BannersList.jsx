import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { observer } from "mobx-react-lite";
import { BASE_IMAGE_URL } from "../../../api/config";
import HomeStore from "../../../store/HomeStore";
import EyeIcon from "../orders/EyeIcon";
import DeleteIcon from "../allproducts/DeleteIcon";
import data from "../../../JSON_DB/orders.json";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const BannersList = observer(() => {
  const navigate = useNavigate();
  const [bannersList, setBannersList] = useState([data]);

  useEffect(() => {
    HomeStore.getBanners();
  }, []);

  useEffect(() => {
    setBannersList(HomeStore.data.bannersList);
  }, [HomeStore.data.bannersList]);

  const deleteBanner = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this banner!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          BANNER_ID: param?.BANNER_ID
        };
        HomeStore.deleteBanner(data, navigationCallBackDelete);
      }
    });
  };
  const navigationCallBackDelete = () => {
    HomeStore.getBanners();
  };
  const editBanner = items => {
    navigate("/banners/addBanner", { state: { item: items } });
  };

  const bannersHeading = [
    "Banner ID",
    "Banner Description",
    "Banner Images",
    "Action",
    "Delete"
  ];

  return (
    <div className='admin_container'>
      <div style={{ height: "100%" }}>
        <TableContainer
          component={Paper}
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px"
          }}
        >
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                {bannersHeading.map(item => {
                  return <TableCell align='center'>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {bannersList?.map(items => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row' align='center'>
                      {items?.BANNER_ID}
                    </TableCell>
                    <TableCell align='center'>{items?.BANNER_DESC}</TableCell>
                    <TableCell align='center'>
                      {" "}
                      {items?.BANNER_IMAGE != "" ? (
                        <img
                          crossOrigin='anonymous'
                          src={BASE_IMAGE_URL + items?.BANNER_IMAGE}
                          style={{ width: "40px", height: "40px" }}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell align='center'>
                      <div onClick={() => editBanner(items)}>
                        <EyeIcon />
                      </div>
                    </TableCell>
                    <TableCell align='center'>
                      <div onClick={() => deleteBanner(items)}>
                        <DeleteIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});

export default BannersList;
