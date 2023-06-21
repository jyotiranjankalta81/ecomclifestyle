import { Avatar, Button } from "@mui/material";
import React from "react";
import { OneLineInput } from "../../../components/contactUs/PlainInput/PlainInput";
import "./adminprofile.css";

const AdminProfile = () => {
  const [edit, setEdit] = React.useState(false);
  return (
    <>
      <div className='admin_container'>
        <div className='admin_profile_container'>
          <div className='profile_header'>
            <h2>My Profile</h2>
          </div>
          <div className='two_sided_container'>
            <div className='image_container'>
              <Avatar
                sx={{
                  width: 150,
                  height: 150
                }}
              />

              <div className='button_container'>
                <Button
                  sx={{
                    background: "rgb(63, 81, 181)",
                    color: "#FFFFFF",
                    borderRadius: "7px",
                    "&:hover": {
                      backgroundColor: "rgb(63, 81, 181)"
                    }
                  }}
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  sx={{
                    background: "rgb(63, 81, 181)",
                    color: "#FFFFFF",
                    borderRadius: "7px",
                    "&:hover": {
                      backgroundColor: "rgb(63, 81, 181)"
                    }
                  }}
                  onClick={() => setEdit(false)}
                >
                  Save Profile
                </Button>
              </div>
            </div>
            {edit ? (
              <div className='details_container'>
                <OneLineInput label='Full Name' />
                <OneLineInput label='Email:' />
                <OneLineInput label='Phone' />
                <OneLineInput label='Join Date' />

                <Button
                  sx={{
                    background: "rgb(63, 81, 181)",
                    color: "#FFFFFF",
                    borderRadius: "7px",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "rgb(63, 81, 181)"
                    }
                  }}
                >
                  Change Password
                </Button>
              </div>
            ) : (
              <div className='details_container'>
                {/* <OneLineInput label='Full Name' />

              <OneLineInput label='Email:' />
              <OneLineInput label='Phone' />
              <OneLineInput label='Join Date' /> */}
                <p className='label_name'>
                  <b>Full Name:</b>
                </p>
                <p className='label_name'>Jyoti Ranjan Kalta</p>
                <p className='label_name'>
                  <b>Email:</b>
                </p>
                <p className='label_name'>jyotirikalra@gmail.com</p>
                <p className='label_name'>
                  <b>Phone</b>
                </p>
                <p className='label_name'>+91 9348063132</p>
                <p className='label_name'>
                  <b>Joined Date</b>
                </p>
                <p className='label_name'>20-25-2022</p>

                <Button
                  sx={{
                    background: "rgb(63, 81, 181)",
                    color: "#FFFFFF",
                    borderRadius: "7px",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "rgb(63, 81, 181)"
                    }
                  }}
                >
                  Change Password
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
