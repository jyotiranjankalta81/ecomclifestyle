import { BASE_API_URL } from "../../api/config";
import aboutimg from "../../assets/nav-logo.png";
import HomeStore from "../../store/HomeStore";
const apikey = "rzp_test_vDtYuuL3iHbPDn";
const secereate = "Rd0Jc7RkBjGGNDcJG53gJ0GB";
let responsedata = {};

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "localhost";
export const displayRazorpay = async (
  { ammount, userid },
  callback
) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }
  var param = {
    'ammount': ammount
  }
  const data = await fetch(
    `${BASE_API_URL}/payment/razorpay`,
    {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param),
    }
  ).then((t) => t.json())



  const options = {
    key: apikey,
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Quality Cricket",
    description: "Thank you for nothing. Please give us some money",
    image: aboutimg,
    handler: function (response) {
      callback(response);
    },
    modal: {
      "ondismiss": function () {
        HomeStore.loading = false;
      }
    },
    prefill: {
      id: userid,
      ammount,
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open()

};
