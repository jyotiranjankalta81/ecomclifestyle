import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
class OrderStore {
  loading = false
  data = {
    orderList: []
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }

  async getOrders() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('/admin/allorder')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.orderList = response.data.data;
        })
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("logineere", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async orderStatus(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.put('admin/chnage-order-status', data)
      if (response.data.success == true) {
        navigationCallBackUpdate()
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("logineere", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async giveRating(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.post('main/rating-review', data)
      if (response.data.success == true) {
        toast("Thank you for your valuable feedback","success")
        navigationCallBack()
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("logineere", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }

}

export default new OrderStore()
