import { Formik } from "formik";
import { useState } from "react";
import AuthStore from "../../../store/AuthStore";
import "./Forgot.scss";
import VerifyForgot from "./VerifyForgot";

const Forgot = () => {
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState();


    const handleVerify = (e) => {
        AuthStore.forgotPassword(e, navigationCallBack)
    };
    const navigationCallBack = () => {
        setVerify(true);
    }

    const EmailInput = () => {
        return (
            <div className="forgot-container">
                <div className="forgot-form">
                    <div className="heading">Forget Password</div>
                    <p>Enter the email address associated with your account.</p>
                    <Formik
                        initialValues={{ EMAIL: "" }}
                        onSubmit={(values) => handleVerify(values)}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='sendotp'>
                                    <div className="input-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            required
                                            name="EMAIL"
                                            type="email"
                                            id="tel"
                                            onChange={handleChange}
                                            onBlur={handleBlur("EMAIL")}
                                            value={values.EMAIL}
                                            placeholder="Enter Email"
                                        /></div>
                                </div>

                                <div className="input-group">
                                    <button type="submit" className="login-btn">Continue</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    };
    return (
        <>
            {!verify ? (
                <EmailInput />
            ) : (
                <VerifyForgot
                    title={"Verification required"}
                    description={"To continue, complete this verification step. We've sent an OTP to the email"}
                    emaildesc={email}
                    handleVerify={handleVerify}
                />
            )}
        </>
    );
};

export default Forgot;
