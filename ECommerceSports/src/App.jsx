import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import AuthBackground from "./screens/Auth";
import Auth from "./screens/Auth/register/Register";
import EmailLogin from "./screens/Auth/EmailLogin/EmailLogin";
import PhoneLogin from "./screens/Auth/PhoneLogin/PhonLogin.screen";

import FeaturedProduct from "./screens/FeaturedProduct/FeaturedProduct";
import FilterList from "./components/filtercomponent/FilterList";
import SingleProductContainer from "./screens/SingleProductContainer";
import RatingView from "./components/ratingreview/RatingView.component";
import Checkout from "./screens/Checkout";
import ProductCart from "./screens/Cart/ProductCart";
import ProductBrand from "./screens/Admin/productManagement/ProductBrand/ProductBrand";
import ProductBullk from "./screens/Admin/productManagement/ProductBullk/ProductBullk";

import Ratingpage from "./components/RatingPage/RatingPage";
import ContactUs from "./components/contactUs/ConatctUs";
import EditYourAddress from "./components/userSetting/edityourAddress/EditYourAddress";
import YourAddress from "./components/userSetting/yourAddress/YourAddress";
import LoginSecurity from "./components/userSetting/loginSecurity/loginSecurity";
import YourAccount from "./components/userSetting/yourAccount/YourAccount";
import YourOrder from "./components/userSetting/yourOrder/YourOrder";

import Forgot from "./screens/Auth/Forgot/Forgot";
import Faq from "./screens/Faq/Faq";
import AuthStore from "./store/AuthStore";

import Home from "./screens/MainHome";
import Header from "./screens/Header/Header";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

//Admin
import ProductCategory from "./screens/Admin/productManagement/ProductCategory/ProductCategory";
import ProductSubCategory from "./screens/Admin/productManagement/ProductSubCategory/ProductSubCategory";
import ProductSize from "./screens/Admin/productManagement/ProductSize/ProductSize";
import ProductColor from "./screens/Admin/productManagement/ProductColor/ProductColor";
import ProductInfo from "./screens/Admin/allproducts/ProductInfo";
import AddProducts from "./screens/Admin/addProducts/AddProducts";
import AdminDashboard from "./screens/Admin/dashboard/AdminDashboard";
import AddBanners from "./screens/Admin/banners/AddBanners";
import AdminHeader from "./components/dashboard/Header/AdminHeader";
import BannersList from "./screens/Admin/banners/BannersList";
import AllOrders from "./screens/Admin/orders/AllOrders";
import Coupon from "./screens/Admin/coupon/Coupon";
import AboutUs from "./screens/insideHome/aboutUs";
import PrivacyPolicy from "./screens/PrivacyPolicy/PrivacyPolicy";
import ReturnAndRefund from "./screens/ReturnAndRefund/ReturnAndRefund";
import ShippingPolicy from "./screens/ShippingPolicy/ShippingPolicy";
import Terms from "./screens/TermsAndConditions/Terms";
import Invoice from "./screens/Cart/Invoice/Invoice";
import UserProfilePage from "./screens/UserProfile/UserProfilePage";
import Reports from "./screens/Reports/Reports";
import AdminProfile from "./screens/Admin/AdminProfile/AdminProfile";
import { Contact } from "./screens/Admin/Contact/Contact";
import { CancelOrder } from "./screens/Admin/CancelOrder/CancelOrder";
import SubAdmin from "./screens/Admin/AddAdmin/SubAdmin";
import RatingReviews from "./components/RatingReviewPage/RatingReviews";

const App = observer(() => {
  useEffect(() => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let role = localStorage.getItem("role");
    if (token) {
      AuthStore.login(null, email, role, token);
    }
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <>
          {AuthStore.data.role != "0" && <Header />}
          {AuthStore.data.role === "0" && AuthStore.data.token && (
            <AdminHeader />
          )}
          <Routes>
            <Route
              path='/'
              element={
                AuthStore.data.role === "0" && AuthStore.data.token ? (
                  <AdminDashboard />
                ) : (
                  <Home />
                )
              }
            />

            {!AuthStore.data.token && (
              <Route path='/login' element={<AuthBackground />}>
                <Route index element={<EmailLogin />} />
                <Route path='phonelogin' element={<PhoneLogin />} />
                <Route path='register' element={<Auth />} />
                <Route path='forgot' element={<Forgot />} />
              </Route>
            )}
            <Route path='/products' element={<FeaturedProduct />} />
            <Route path='/sale' element={<FeaturedProduct />} />
            <Route path='/accessories' element={<FeaturedProduct />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/about' element={<AboutUs />} />

            <Route path='/filterlist' element={<FilterList />} />
            <Route path='/review' element={<RatingView />} />
            <Route
              exact
              path='/products/:id'
              element={<SingleProductContainer />}
            />
            <Route exact path='/product/checkout' element={<Checkout />} />
            <Route exact path='/home/cart' element={<ProductCart />} />
            <Route path='/rating-page' element={<Ratingpage />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/edityouraddress' element={<EditYourAddress />} />
            <Route path='/address' element={<YourAddress />} />
            <Route path='/loginsecurity' element={<LoginSecurity />} />
            <Route path='/account' element={<YourAccount />} />
            <Route path='/order' element={<YourOrder />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/userprofile' element={<UserProfilePage />} />
            <Route path='/viewratingreviews' element={<RatingReviews />} />

            <Route path='/admin/order' element={<AllOrders />} />
            <Route path='/admin/products' element={<ProductInfo />} />
            <Route path='/admin/addproducts' element={<AddProducts />} />
            <Route path='/admin/coupon' element={<Coupon />} />
            <Route path='/admin/report' element={<Reports />} />
            <Route path='/admin/profile' element={<AdminProfile />} />
            <Route path='/admin/contact' element={<Contact />} />
            <Route path='/admin/cancel' element={<CancelOrder />} />
            <Route path='/admin/adduser' element={<SubAdmin />} />

            <Route path='/products/category' element={<ProductCategory />} />
            <Route path='/products/brand' element={<ProductBrand />} />
            <Route path='admin/product-management' element={<ProductBullk />} />
            <Route
              path='/products/subcategory'
              element={<ProductSubCategory />}
            />
            <Route path='/products/size' element={<ProductSize />} />
            <Route path='/products/color' element={<ProductColor />} />
            <Route path='/banners/bannersList' element={<BannersList />} />
            <Route path='/banners/addBanner' element={<AddBanners />} />

            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/refund-and-return' element={<ReturnAndRefund />} />
            <Route path='/shipping-policy' element={<ShippingPolicy />} />
            <Route path='/terms-conditions' element={<Terms />} />
          </Routes>
        </>
      </Router>
    </>
  );
});

export default App;
