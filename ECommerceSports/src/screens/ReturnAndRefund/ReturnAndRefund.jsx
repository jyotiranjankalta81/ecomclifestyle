import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const ReturnAndRefund = () => {
  return (
    <>
      <div className='privacy_policy_container'>
        <h2 className='refund_heading'>Return and Refund Policy:</h2>
        <ol>
          <li>
            All returns must be postmarked within 7 days of the original
            purchase date to qualify for a refund.{" "}
          </li>
          <li>
            All returned items must be in their original packaging, with all
            included accessories, and in a condition suitable for resale.{" "}
          </li>
          <li>
            Refunds will be issued in the same form of payment used for the
            original purchase. (If used a bank card, the funds will be credited
            to the same payment method in 15-21 working days Or shall be
            instantly credited to your QC wallet)
          </li>
          <li>
            Return shipping and handling fees is the responsibility of the
            customer if choosing to return an item for more than once.{" "}
          </li>
          <li>
            Items purchased on sale or with a promotional code are eligible for
            store credit only.{" "}
          </li>
          <li>
            Please note that we cannot accept returns for items that are custom
            products, damaged, altered, or used and such will be non-refundable
            and non-exchangeable.{" "}
          </li>
          <li>
            We cannot accept returns of any items that have been used or altered
            in any way.{" "}
          </li>
          <li>
            Defective items may be exchanged for the same item within 7 days of
            the original purchase date.
          </li>
          <li>
            Customers must contact us at &nbsp;
            <a
              href='https://mail.google.com/mail/u/0/#inbox?compose=new'
              target='_blank'
            >
              customerservice@qualitycricket.com
            </a>
            &nbsp; prior to returning any items to receive a Return
            Authorization Number.{" "}
          </li>
          <li>
            Items sent back to us without first requesting a return will not be
            accepted.
          </li>
          <li>
            All returns must include the shipping label provided by Quality
            Cricket
          </li>
          <li>Refunds will be done on the original mode of payment used.</li>
        </ol>
      </div>
      <Footer />
    </>
  );
};

export default ReturnAndRefund;
