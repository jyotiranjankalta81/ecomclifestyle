import express, { Express, Response, Request } from "express";
import { auth } from "../../middlewares/auth";
import { MainController } from "../../controller/main.controller";
import { AdminController } from "../../controller/admin.controller";
import { orderInvoice } from "../../controller/invoice.controller";
export const mainrouter = express.Router();

mainrouter.get("/product-category", AdminController.get_category);
mainrouter.get("/product-subcategory", AdminController.get_subcategory);
mainrouter.get("/product-size", AdminController.get_productsize);
mainrouter.get("/product-color", AdminController.get_productcolor);
mainrouter.get("/product", AdminController.get_product);


// top seller --------------------------------------------------------------
mainrouter.get("/top-product", AdminController.get_topseller_product);
mainrouter.post("/recommended-product", AdminController.recommended_product);

//SALES --------------------------------------------------------------
mainrouter.post("/sales-filter", MainController.filter_product);

//cart-----------------------------------------------------------------------
mainrouter.get("/get_cart", auth(), MainController.get_cart);
mainrouter.post("/create_cart", auth(), MainController.create_cart);
mainrouter.put("/update_cart", auth(), MainController.update_cart);
mainrouter.delete("/delete_cart", auth(), MainController.delete_cart);

//order-----------------------------------------------------------------------

mainrouter.post("/create_order", auth(), MainController.create_order);
mainrouter.post("/create-session",  MainController.create_session);
mainrouter.get("/my_order", auth(), MainController.get_order);

// contact--------------------------------------------------------------------
mainrouter.post("/contact", MainController.contact);
mainrouter.get("/contact", auth(), MainController.get_contact);

// address-----------------------------------------------------------------

mainrouter.post("/address", auth(), MainController.addAddress);
mainrouter.get("/address", auth(), MainController.getAddress);
mainrouter.put("/address", auth(), MainController.updateAddress);
mainrouter.delete("/address", auth(), MainController.deleteAddress);

// rating and reviews
mainrouter.post("/rating-review", auth(), MainController.addRatingReview);
mainrouter.get("/rating-review",  MainController.getRatingReview);

///NOTIFICATIONS ------------------------------------------------
mainrouter.post("/notification", auth(), MainController.createNotification);
mainrouter.get("/notification",  MainController.getNotification);
mainrouter.put("/notification/:id", auth(), MainController.updateNotification);


//search---------------------------------------------------------------
mainrouter.post("/product-search",  MainController.Produectsearch);


//order payment 

mainrouter.post("/update-payment",  MainController.update_payment);
mainrouter.post("/order-invoice",auth(),orderInvoice);


