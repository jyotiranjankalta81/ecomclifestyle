import { configure, makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import { axiosInstance, setAuthToken } from "../api/axiosInstance"
class UserStore {
    loading = false
    data = {
        addressList: [],
        users: []
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

    async addAddress(data, navigationCallBack) {
        this.toggleLoading(true);
        try {
            const response = await axiosInstance.post('/main/address', data)
            if (response.data.success === true) {
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
    async updateAddress(data, navigationCallBack) {
        this.toggleLoading(true);
        try {
            const response = await axiosInstance.put('/main/address', data)
            if (response.data.success === true) {
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

    async getAddress() {
        this.toggleLoading(true);
        try {
            const response = await axiosInstance.get('main/address')
            if (response.data.success == true) {
                runInAction(() => {
                    this.data.addressList = response.data.data;
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
    async addressDelete(id, navigationCallBackDelete) {
        this.toggleLoading(true);
        try {
            const response = await axiosInstance.delete(`main/address?ADDRESS_ID=${id}`)
            if (response.data.success == true) {
                toast("Successfully Deleted");
                navigationCallBackDelete();
            } else {
                // toast("Wow so easy!");
                throw "Error"
            }
        }
        catch (err) {
            console.log("address", err)
        }
        finally {
            this.toggleLoading(false);
        }
    }


    async getUsers() {
        this.toggleLoading(true);
        try {
            const response = await axiosInstance.get('user/users')
            if (response.data.success == true) {
                console.log(response);
                toast('Data Feched')
                runInAction(() => {
                    this.data.users = response?.data?.data;
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
}



export default new UserStore()
