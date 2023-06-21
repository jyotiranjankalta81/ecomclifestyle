
class ApiStatusClass{

    successmsg = (message = "success") =>{
        return {
            success : true,
            message : message,
            data : [],
        }
    }
    successmsgdata = (message = "success",data = []) =>{
        return {
            success : true,
            message : message,
            data : data,
        }
    }

    errormsg = (message = "fail") =>{
        return {
            success : false,
            message : message,
            data : [],
        }
    }
    errormsgdata = (message = "fail",data = []) =>{
        return {
            success : false,
            message : message,
            data : data,
        }
    }
}


const ApiStatus =  new ApiStatusClass();
export default ApiStatus