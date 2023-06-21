import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
class CouponStore {
  loading = false
  data = {
    couponList: []
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }

  async getCoupon() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('/admin/coupon')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.couponList = response.data.data;
        })
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("coupon", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async addCoupon(param, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('/admin/coupon', param)
      if (response.data.success === true) {
        navigationCallBack();
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("coupon", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async updateCoupon(param, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.put('/admin/coupon', param)
      if (response.data.success === true) {
        navigationCallBack();
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("coupon", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async deleteCoupon(id, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.delete(`admin/coupon?COUPON_ID=${id}`)
      if (response.data.success === true) {
        toast("Successfully Deleted");
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
  async applyCoupon(param, navigationCallBackCoupon) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('/admin/apply-coupon', param)
      if (response?.data.success === true) {
        navigationCallBackCoupon(response?.data?.data)
      } 
     }
    catch (err) {
      console.log(err);
      toast.error("Invalid Coupon")
    }
    finally {
      this.toggleLoading(false);
    }
  }

}

export default new CouponStore()
