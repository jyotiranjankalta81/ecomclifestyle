import * as React from "react";
import { PlainInput } from "../../../components/contactUs/PlainInput/PlainInput";
import "./SubAdmin.css";
import Box from "@mui/material/Box";
import { observer } from "mobx-react";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthStore from "../../../store/AuthStore";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate, useNavigate } from "react-router-dom";
import UserStore from "../../../store/UserStore";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpSchema = Yup.object().shape({
  FULLNAME: Yup.string().required("Required"),
  MOBILENO: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  EMAIL: Yup.string().email("Invalid email").required("Required"),
  PASSWORD: Yup.string()
    .required("Required")
    .min(6, "Your password must be longer than 6 characters.")
});

const SubAdmin = observer(() => {
  const navigate = useNavigate();
  const [verify, setVerify] = React.useState(false);
  const [mobileNo, setMobileNo] = React.useState("");
  const [user, setUsers] = React.useState();

  const columns = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "EMAIL",
      headerName: "EMAIL",
      width: 150,
      editable: true
    },
    {
      field: "FULLNAME",
      headerName: "Full Name",
      width: 150,
      editable: true
    },
    {
      field: "MOBILENO",
      headerName: "Mobile",
      type: "number",
      width: 110,
      editable: true
    },
    {
      field: "PASSWORD",
      headerName: "Password",
      type: "number",
      width: 110,
      editable: true
    },
    {
      field: "USERROLE",
      headerName: "User Role",
      type: "number",
      width: 110,
      editable: true
    },
    // {
    //   headerName: "Delete User",
    //   headerClassName: "super-app-theme--header",
    //   renderCell: params => actionElement(params),
    //   width: 110
    // },
    {
      headerName: "Change to Admin/Delete User",
      headerClassName: "super-app-theme--header",
      renderCell: params => actionElement(params),
      width: 200
    }
  ];

  const handleVerify = otp => {
    setVerify(false);
  };
  const signup = e => {
    AuthStore.register(e, navigationCallBack);
  };
  const navigationCallBack = () => {
    // navigate('/login')
    window.location.reload();
  };
  React.useEffect(() => {
    UserStore.getUsers();
  }, []);
  React.useEffect(() => {
    setUsers(UserStore.data.users);
  }, [UserStore.data.users]);

  console.log(UserStore.data.users);

  const actionElement = params => (
    <div className='action-wrapper'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteCoupon(params)}>
          {/* <DeleteIcon className='action-icon' /> */}
          <Switch className='action-icon' />
        </div>
      }
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteCoupon(params)}>
          <DeleteIcon className='action-icon' />
        </div>
      }
    </div>
  );

  const ChangeUserStatus = params => (
    <div className='action-wrappersssss'>
      {
        <div style={{ cursor: "pointer" }} onClick={() => deleteCoupon(params)}>
          {/* <DeleteIcon className='action-icon' /> */}
          <Switch className='action-icon' />
        </div>
      }
    </div>
  );

  // console.log(user);
  // console.log(Array.from(user));
  return (
    <>
      <div className='admin_container'>
        <div className='add_user_container'>
          <div className='add_details_container'>
            <Formik
              initialValues={{
                FULLNAME: "",
                MOBILENO: "",
                EMAIL: "",
                PASSWORD: ""
              }}
              onSubmit={values => signup(values)}
              validationSchema={SignUpSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched
              }) => (
                <form onSubmit={handleSubmit} className='Add_User-form'>
                  <h3 className='heading_add_user'>Sub Admin Details</h3>
                  <div className='input_add_admin'>
                    <div className='input-group'>
                      <label htmlFor='fullname'>Full name</label>
                      <input
                        name='FULLNAME'
                        required
                        type='text'
                        id='fullname'
                        placeholder='Enter full name'
                        onChange={handleChange("FULLNAME")}
                        onBlur={handleBlur("FULLNAME")}
                        value={values.FULLNAME}
                      />
                      {errors.FULLNAME && touched.FULLNAME ? (
                        <span className='error'>{errors.FULLNAME}</span>
                      ) : null}
                    </div>
                    <div className='input-group'>
                      <label htmlFor='tel'>Mobile Number</label>
                      <input
                        name='MOBILENO'
                        required
                        type='tel'
                        id='tel'
                        placeholder='Enter mobile number'
                        onChange={handleChange("MOBILENO")}
                        onBlur={handleBlur("MOBILENO")}
                        value={values.MOBILENO}
                      />
                      {errors.MOBILENO && touched.MOBILENO ? (
                        <span className='error'>{errors.MOBILENO}</span>
                      ) : null}
                    </div>
                    <div className='input-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        name='EMAIL'
                        required
                        type='email'
                        id='email'
                        placeholder='Enter email'
                        onChange={handleChange("EMAIL")}
                        onBlur={handleBlur("EMAIL")}
                        value={values.EMAIL}
                      />
                      {errors.EMAIL && touched.EMAIL ? (
                        <span className='error'>{errors.EMAIL}</span>
                      ) : null}
                    </div>
                    <div className='input-group'>
                      <label htmlFor='password'>Password</label>
                      <input
                        name='PASSWORD'
                        required
                        title='*At least six characters'
                        pattern='.{6,}'
                        type='password'
                        id='password'
                        placeholder='Enter password'
                        onChange={handleChange("PASSWORD")}
                        onBlur={handleBlur("PASSWORD")}
                        value={values.PASSWORD}
                      />
                      {errors.PASSWORD && touched.PASSWORD ? (
                        <span className='error'>{errors.PASSWORD}</span>
                      ) : null}
                      <div>*At least six characters</div>
                    </div>
                  </div>
                  <div className='input-group'>
                    <button type='submit' className='register-btn'>
                      Continue
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        <div className='table_container'>
          <Box
            sx={{
              height: 400,
              width: "100%",
              boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px"
            }}
          >
            <DataGrid
              rows={user || ""}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={row => row.ID + 1}
              editMode={false}
            />
            {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      /> */}
          </Box>
        </div>
      </div>
    </>
  );
});

export default SubAdmin;
