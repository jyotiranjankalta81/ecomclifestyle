"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiStatusClass {
    constructor() {
        this.successmsg = (message = "success") => {
            return {
                success: true,
                message: message,
                data: [],
            };
        };
        this.successmsgdata = (message = "success", data = []) => {
            return {
                success: true,
                message: message,
                data: data,
            };
        };
        this.errormsg = (message = "fail") => {
            return {
                success: false,
                message: message,
                data: [],
            };
        };
        this.errormsgdata = (message = "fail", data = []) => {
            return {
                success: false,
                message: message,
                data: data,
            };
        };
    }
}
const ApiStatus = new ApiStatusClass();
exports.default = ApiStatus;
//# sourceMappingURL=apistatus.js.map