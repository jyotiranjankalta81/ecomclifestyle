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

const ProductSize = observer(() => {
  const [isOpen, setisOpen] = useState(false);
  const [size, setSize] = useState();
  const [sizeID, setSizeID] = useState();
  const [sizeList, setSizeList] = useState();
  const columns = [
    { field: "PRODUCTSIZE_ID", headerName: "ID", width: 90 },
    {
      field: "PRODUCTSIZE_NAME",
      headerName: "SIZE NAME",
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
    ProductStore.getSize();
  }, []);

  useEffect(() => {
    setSizeList(ProductStore.data.sizeList);
  }, [ProductStore.data.sizeList]);

  const openModal = param => {
    setSize(param?.row?.PRODUCTSIZE_NAME);
    setSizeID(param?.row?.PRODUCTSIZE_ID);
    setisOpen(!isOpen);
  };
  const handleChange = e => {
    setSize(e.target.value);
  };
  const addSize = () => {
    let data = {
      PRODUCTSIZE_NAME: size
    };
    ProductStore.addSize(data, navigationCallBack);
  };
  const navigationCallBack = () => {
    setSize();
    openModal();
    ProductStore.getSize();
  };

  const updateSize = () => {
    let data = {
      PRODUCTSIZE_NAME: size,
      PRODUCTSIZE_ID: sizeID
    };
    ProductStore.updateSize(data, navigationCallBackUpdate);
  };
  const navigationCallBackUpdate = () => {
    setSize();
    setSizeID();
    openModal();
    ProductStore.getSize();
  };

  const deleteSize = param => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this size!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let data = {
          PRODUCTSIZE_NAME: param?.row?.PRODUCTSIZE_NAME,
          PRODUCTSIZE_ID: param?.row?.PRODUCTSIZE_ID,
          ISDELETED: true
        };
        ProductStore.deleteSize(data, navigationCallBackDelete);
      }
    });
  };

  const navigationCallBackDelete = () => {
    setSize();
    setSizeID();
    ProductStore.getSize();
  };

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => openModal(params)}>
          <RemoveRedEyeIcon />
        </div>
      }
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteSize(params)}>
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
              data={sizeList}
            >
              Export CSV
            </CsvDownloadButton>
            <button className='modal_btn' onClick={() => openModal()}>
              Add Size
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
              rows={sizeList || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.PRODUCTSIZE_ID + 1}
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
              <h3>{sizeID ? "Edit Size" : "Add Size"}</h3>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Size'
                variant='outlined'
                placeholder='Enter the Size'
                type='text'
                value={size}
                required
                onChange={handleChange}
              />
              <div className='modal_button_section'>
                <button
                  className='modal_submit_btn'
                  onClick={() => {
                    sizeID ? updateSize() : addSize();
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
export default ProductSize;
