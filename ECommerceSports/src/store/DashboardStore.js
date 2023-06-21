import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
class DashboardStore {
  loading = false
  data = {
    dashboard: [],
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }

  async dashboard() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('admin/dashboard')
      if (response.data.success == true) {
        runInAction(() => {
          this.data.dashboard = response?.data?.data;
        })
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("dashbaord", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }

}

export default new DashboardStore()
