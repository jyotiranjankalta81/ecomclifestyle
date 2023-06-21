import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
class HomeStore {
  loading = false
  data = {
    products: [],
    bannersList: [],
    carts: [],
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
  }
  toggleLoading = (toggle) => {
    this.loading = toggle
  }

  async getProducts() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('main/product')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.products = response.data.data;
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

  async getBanners() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('/admin/banner')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.bannersList = response.data.data;
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

  async deleteBanner(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/delete-banner', data)
      if (response.data.success === true) {
        toast("Successfully Deleted");
        navigationCallBackDelete()
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

  async addBanner(data, navigationCallBack, resetForm) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/banner', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
        navigationCallBack(resetForm)
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

  async updateBanner(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/banner', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
        navigationCallBackUpdate()
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

  async addToCart(data,navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('main/create_cart', data)
      if (response.data.success == true) {
        toast("Product added to cart");
        navigationCallBack()
      } else {
        // throw "Error"
      }
    } catch (err) {
      // toast("Please login first");
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async getCarts() {
    this.toggleLoading(true);
    try {
      const response = await axiosInstance.get('main/get_cart')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.carts = response.data.data;
        })
      } else {
        // toast("Wow so easy!");
        throw "Error"
      }
    }
    catch (err) {
      console.log("cart", err)
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async manageQty(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('main/update_cart', data)
      if (response.data.success == true) {
        navigationCallBack()
      } else {
        throw "Error"
      }
    } catch (err) {
      // toast("Please login first");
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async deleteCart(id, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.delete(`main/delete_cart?CART_ID=${id}`)
      if (response.data.success == true) {
        navigationCallBackDelete()
      } else {
        throw "Error"
      }
    } catch (err) {
      toast("Please login first");
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async placeOrder(data,navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('/main/create_order', data)
      if (response.data.success == true) {
        navigationCallBack()
      } else {
        throw "Error"
      }
    } catch (err) {
      // toast("Please login first");
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }
  
  async contectUs(data,navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('/main/contact', data)
      if (response.data.success == true) {
        navigationCallBack()       
      } else {
        throw "Error"
      }
    } catch (err) {
      // toast("Please login first");
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }



}

export default new HomeStore()
