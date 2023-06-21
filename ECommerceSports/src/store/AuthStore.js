import { makeAutoObservable, runInAction } from "mobx"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
import { toast } from 'react-toastify';
class AuthStore {
  loading = false
  data = {
    email: "",
    role: "",
    token: "",
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }
  async updateAsyncStore(data) {
    localStorage.setItem("token", data?.tokens?.access?.token)
    localStorage.setItem("role", data.userrole)
    localStorage.setItem("email", data.email)
    localStorage.setItem("name", data.FULLNAME)
  }

  updateTokenFromStorage(email, role, token) {
    this.data.token = token
    this.data.email = email
    this.data.role = role
  }

  async login(creds, email, role, token, navigationCallBack) {
    if (token) {
      setAuthToken();
      this.updateTokenFromStorage(email, role, token)
    } else {
      this.toggleLoading(true);
      try {
        const response = await axiosInstance.post('user/login', creds)
        if (response.data.success === true) {
          this.updateAsyncStore(response.data.data)
          setAuthToken(response.data.token)
          runInAction(() => {
            this.data.email = response.data.data.email;
            this.data.role = response.data.data.userrole;
            this.data.token = response.data.data?.tokens?.access?.token;
          })
          navigationCallBack()
        } else {
          console.log("");
        }
      }
      catch (err) {
        toast(err?.response?.data?.message);
      }
      finally {
        this.toggleLoading(false);
      }
    }
  }

  async loginWithNumber(creds, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('user/login-withotp', creds)
      if (response.data.success === true) {
        toast(response?.data?.message);
        navigationCallBack()
      } else {
        console.log("");
      }
    }
    catch (err) {
      toast(err?.response?.data?.message);
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async verifyOTP(creds, email, role, token, navigationCallBackLogin) {
    if (token) {
      setAuthToken();
      this.updateTokenFromStorage(email, role, token)
    } else {
      this.toggleLoading(true);
      try {
        const response = await axiosInstance.post('user/verify-otp', creds)
        if (response.data.success === true) {
          this.updateAsyncStore(response.data.data)
          setAuthToken(response.data.token)
          runInAction(() => {
            this.data.email = response.data.data.email;
            this.data.role = response.data.data.userrole;
            this.data.token = response.data.data?.tokens?.access?.token;
          })
          navigationCallBackLogin()
        } else {
          console.log("");
        }
      }
      catch (err) {
        toast(err?.response?.data?.message);
      }
      finally {
        this.toggleLoading(false);
      }
    }
  }

  async register(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('user/register', data)
      if (response.data.success === true) {
        toast("Successfully Registered");
        navigationCallBack()
      } else {
        throw "Error"
      }
    }
    catch (err) {
      toast(err?.response?.data?.message);

      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async forgotPassword(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('user/forgot-password', data)
      if (response.data.success === true) {
        toast("Successfully Send OTP");
        navigationCallBack()
      } else {
        throw "Error"
      }
    }
    catch (err) {
      toast(err?.response?.data?.message);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }


}

export default new AuthStore()
