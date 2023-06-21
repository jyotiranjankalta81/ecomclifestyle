import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductStore from "../../../../store/ProductStore";
import { observer } from "mobx-react-lite";
import swal from "sweetalert";
import CsvDownloadButton from "react-json-to-csv";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: "17px",
  boxShadow: 24,
  gap: "1.5rem",
  p: "2rem"
};

const ProductColor = observer(() => {
  const [isOpen, setisOpen] = useState(false);
  const [color, setColor] = useState();
  const [colorID, setColorID] = useState();
  const [colorList, setColorList] = useState();
  const columns = [
    { field: "PRODUCTCOLOR_ID", headerName: "ID", width: 90 },
    {
      field: "PRODUCTCOLOR_NAME",
      headerName: "COLOR NAME",
      width: 150,
      editable: true
    },
    {
      headerName: "Actions",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params)
    }
  ];

  useEffect(() => {
    ProductStore.getColor();
  }, []);

  useEffect(() => {
    setColorList(ProductStore.data.colorList);
  }, [ProductStore.data.colorList]);

  const openModal = param => {
    setColor(param?.row?.PRODUCTCOLOR_NAME);
    setColorID(param?.row?.PRODUCTCOLOR_ID);
    setisOpen(!isOpen);
  };
  const handleChange = e => {
    setColor(e.target.value);
  };
  const addColor = () => {
    let data = {
      PRODUCTCOLOR_NAME: color
    };
    ProductStore.addColor(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    setColor();
    openModal();
    ProductStore.getColor();
  };

  const updateColor = () => {
    let data = {
      PRODUCTCOLOR_NAME: color,
      PRODUCTCOLOR_ID: colorID
    };
    ProductStore.updateColor(data, navigationCallBackUpdate);
  };
  const navigationCallBackUpdate = () => {
    setColor();
    setColorID();
    openModal();
    ProductStore.getColor();
  };

  const deleteColor = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this color!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          PRODUCTCOLOR_NAME: param?.row?.PRODUCTCOLOR_NAME,
          PRODUCTCOLOR_ID: param?.row?.PRODUCTCOLOR_ID,
          ISDELETED: true
        };
        ProductStore.deleteColor(data, navigationCallBackDelete);
      }
    });
  };

  const navigationCallBackDelete = () => {
    setColor();
    setColorID();
    ProductStore.getColor();
  };

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => openModal(params)}>
          <RemoveRedEyeIcon />
        </div>
      }
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteColor(params)}>
          <DeleteIcon className='action-icon' />
        </div>
      }
    </div>
  );

  return (
    <>
      <div className='admin_container'>
        <div className='table_container'>
          <div className='button_section'>
            <CsvDownloadButton
              className='modal_btn pointer'
              delimiter=','
              data={colorList}
            >
              Export CSV
            </CsvDownloadButton>
            <button className='modal_btn' onClick={() => openModal()}>
              Add Color
            </button>
          </div>

          <Box
            sx={{
              height: 400,
              width: "100%",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "7px"
            }}
          >
            <DataGrid
              rows={colorList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.PRODUCTCOLOR_ID + 1}
              editMode={false}
            />
          </Box>
        </div>
        <div style={{ outline: "none" }}>
          <Modal
            open={isOpen}
            onClose={openModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='close_icon'>
                <CloseIcon onClick={openModal} />
              </div>
              <h3>{colorID ? "Edit Color" : "Add Color"}</h3>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Color'
                variant='outlined'
                size='small'
                placeholder='Enter the Color'
                type='text'
                value={color}
                required
                onChange={handleChange}
              />
              <div className='modal_button_section'>
                <button
                  className='modal_submit_btn'
                  onClick={() => {
                    colorID ? updateColor() : addColor();
                  }}
                >
                  Submit
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
});
export default ProductColor;
