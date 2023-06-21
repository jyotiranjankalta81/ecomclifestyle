import { configure, makeAutoObservable, runInAction } from "mobx"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
import { toast } from 'react-toastify';
class ProductStore {
  loading = false
  data = {
    categoryList: [],
    brandList: [],
    subCategoryList: [],
    sizeList: [],
    colorList: [],
    productList: [],
    filterProductList: [],
    relatedProductList: [],
    ratingreviews: [],
  }
  errors = {}
  constructor() {
    makeAutoObservable(this)
    configure({
      useProxies: "never"
    })
  }

  toggleLoading = (toggle) => {
    this.loading = toggle
  }

  async addCategory(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product-category', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async getCategory() {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.get('admin/product-category')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.categoryList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateCategory(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product-category', data)
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

  async deleteCategory(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/delete-product-category', data)
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

  //SUB-CATEGORY
  async addSubCategory(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product-subcategory', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async getSubCategory(data) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.get('admin/product-subcategory')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.subCategoryList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateSubCategory(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product-subcategory', data)
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

  async deleteSubCategory(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/delete-product-subcategory', data)
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

  //SIZE
  async addSize(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product-size', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async getSize() {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.get('admin/product-size')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.sizeList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateSize(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product-size', data)
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

  async deleteSize(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/delete-product-size', data)
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

  //COLOR
  async addColor(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product-color', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async getColor() {
    this.toggleLoading(true);
    try {
      // setAuthToken()
      const response = await axiosInstance.get('admin/product-color')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.colorList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateColor(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product-color', data)
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

  async deleteColor(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/delete-product-color', data)
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

  //PRODUCT ADD
  async addProduct(data, navigationCallBack, resetForm) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product', data)
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

  async getProduct() {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.get('admin/product')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.productList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async getRelatedProduct(param) {
    this.toggleLoading(true);
    try {
      // setAuthToken()
      const response = await axiosInstance.post('main/recommended-product', param)
      // console.log("response", response);
      if (response.data.success === true) {
        runInAction(() => {
          this.data.relatedProductList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateProduct(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product', data)
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

  async deleteProduct(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.delete(`admin/product?PRODUCT_ID=${data.PRODUCT_ID}`, data)
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

  //Discount
  async updateProductDiscount(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/add-discount', data)
      console.log(response);
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
  async deactiveProductDiscount(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/remove-discount', data)
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

  //BRAND
  async addBrand(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/product-brands', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async getBrand() {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.get('admin/product-brands')
      if (response.data.success === true) {
        runInAction(() => {
          this.data.brandList = response?.data?.data
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async updateBrand(data, navigationCallBackUpdate) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.put('admin/product-brands', data)
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

  async deleteBrand(data, navigationCallBackDelete) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.delete(`admin/product-brands?id=${data.BRAND_ID}`, data)
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

  async bulkUpload(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('admin/bulk-product-upload', data)
      if (response.data.success === true) {
        toast(response?.data?.message);
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

  async ratingReviews() {
    this.toggleLoading(true);
    try {
      // setAuthToken()
      const response = await axiosInstance.get('main/rating-review')
      console.log(" response" + response)
      if (response.data.success === true) {
        this.data.ratingreviews = response?.data?.data
      } else {
        throw "Error"
      }
    }
    catch (err) {
      console.log(err);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }

  async applyFilter(data) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('/main/sales-filter', data)
      if (response.status === 200) {
        runInAction(() => {
          this.data.filterProductList = response.data.data;
        })
      } else {
        throw "Error"
      }
    }
    catch (err) {
      // toast(err?.response?.data?.message);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }
  async searchProducts(data, navigationCallBack) {
    this.toggleLoading(true);
    try {
      setAuthToken()
      const response = await axiosInstance.post('/main/product-search', data)
      if (response.status === 200) {
        navigationCallBack(response.data.data);
      } else {
        throw "Error"
      }
    }
    catch (err) {
      // toast(err?.response?.data?.message);
      this.toggleLoading(false);
    }
    finally {
      this.toggleLoading(false);
    }
  }



}

export default new ProductStore()
