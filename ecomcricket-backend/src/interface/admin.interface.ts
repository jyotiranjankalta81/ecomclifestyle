export interface CategoryAttributes {
  CATEGORY_ID?: number;
  CATEGORY_NAME: string;
  CATEGORY_CODE?: string;
  CATEGORY_IMAGE?: string;
  ISDELETED?: boolean;
}


export interface CountryAttributes {
  COUNTRY_ID?: number;
  COUNTRY_NAME: string;
  COUNTRY_CODE: string;
  ISDELETED?: boolean;
}

export interface StateAttributes {
  STATE_ID?: number;
  STATE_NAME: string;
  COUNTRY_ID?: number;
  ISDELETED?: boolean;
}

export interface SubCategoryAttributes {
  SUBCATEGORY_ID?: number;
  CATEGORY_ID?: number;
  SUBCATEGORY_NAME: string;
  ISDELETED?: boolean;
}

export interface ProductSizeAttributes {
  PRODUCTSIZE_ID?: number;
  PRODUCTSIZE_NAME: string;
  ISDELETED?: boolean;
}
export interface ProductColorAttributes {
  PRODUCTCOLOR_ID?: number;
  PRODUCTCOLOR_NAME?: string;
  PRODUCTCOLOR_CODE?: string;
  PRODUCTCOLOR_IMAGE: string;
  ISDELETED?: boolean;
}

export interface ProductAttributes {
  PRODUCT_ID?: number;
  CATEGORY_ID: number;
  SUBCATEGORY_ID?: number;
  BRAND_ID?: number;
  PRODUCTSIZE_ID?: string | any[];
  PRODUCTCOLOR_ID?: string | any[];
  PRODUCT_NAME: string;
  PRODUCT_QUANTITY: number;
  PRODUCT_DESCRIPTION: String;
  PRODUCT_PRICE: number;
  PRODUCT_DISCOUNTSTATUS: boolean;
  PRODUCT_DISCOUNT?: number;
  PRODUCT_TAG: any;
  PRODUCT_IMAGE?: any;
  PRODUCT_BARCODE?: any;
  COMPANYCODE?: any;
  WEIGHT?: any;
  PACKAGETYPE?: String;
  BRANCHNAME?: any;
  TECHINFO?:any | null;
  ADDITINFO?:any | null;
  ISDELETED?: boolean;
}

export interface CartAttributes {
  CART_ID?: number;
  CART_USER_ID: number;
  CART_PRODUCT_ID?: number;
  CART_PRODUCT_SIZE?: number;
  CART_PRODUCT_COLOR?: number;
  CART_PRODUCT_QUANTITY?: number;
  ISDELETED?: boolean;
}

export interface bannerAttributes {
  BANNER_ID?: number;
  BANNER_DESC: number;
  BANNER_IMAGE?: number;
  CREATED_BY?: number;
  ISDELETED?: boolean;
}

export interface orderAttributes {
  ORDER_ID?: number;
  ODR_ID: number;
  USER_ORDER?: string;
  PAYMENT_ID?: string;
  PAYMENT_AT?: string;
  USER_ADDRESS? : string;
  ORDER_REFNO?: string;
  AMOUNT?: number;
  TYPE_OF_PAYMENT?: number;
  ORDER_STATUS?: number;
  ORDER_DELIVERY_DATE?: string;
  CREATED_BY?: number;
  ISDELETED?: boolean;
}

export interface ContactAttributes {
  CONTACT_ID?: number;
  NAME: string;
  EMAIL: string;
  PHONE: string;
  MESSAGE: string;
  ISDELETED?: boolean;
}

export interface AddressAttributes {
  ADDRESS_ID?: number;
  ADDRESS_USER_ID: number;
  FULLNAME: string;
  PHONE: string;
  FLAT: string;
  STREET: string;
  LANDMARK: string;
  PIN: string;
  CITY: string;
  STATE: string;
  COUNTRY: string;
  ISDELETED?: boolean;
}

export interface NotificationAttributes {
  NId: number;
  TITLE: string;
  MESSAGE: string;
  DATE?: number;
}

export interface CouponAttributes {
  COUPON_IMAGE: string;
  COUPON_ID?: number;
  COUPON_CODE: string;
  COUPON_MINPRICE: number;
  COUPON_MAXDISCOUNT: number;
  COUPON_DISCOUNTPERCENT: number;
  COUPON_MINORDER: number;
  COUPON_VALIDITY: Date;
  COUPON_EXPIRE?: boolean;
  ADDED_BY: number;
  ISDELETED?: false;
}

export interface BrandAttributes {
  BRAND_ID?: string;
  BRAND_NAME: string;
  BRAND_IMAGE: string;
  BRAND_CODE?: string;
  BRAND_STATUS?: boolean;
  ISDELETED?: boolean;
}
export interface AddRatingReview {
  RATINGREVIEW_ID?: number;
  CREATED_BY: number;
  PRODUCT_ID: number;
  RATING: string;
  REVIEWS: string;
  ISDELETED?: boolean;
}
