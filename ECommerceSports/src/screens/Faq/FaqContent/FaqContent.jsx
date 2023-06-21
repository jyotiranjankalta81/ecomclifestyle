import React from "react";
import "./FaqContent.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
const row = [
  {
    HEADING: "Can i change or cancel my order?",
    CONTENT:
      "Sure! You can cancel, or change your order within 12 hours of confirmation. Please contact us with your name and order number at: info@ecomcricket.com. After 12 hours, your order will have been processed and we won’t be able to make any changes or cancel it."
  },
  {
    HEADING: "Do you offer a guarantee? Can i Return my items?",
    CONTENT:
      "Of course. We offer an extended 30 day guarantee! ☑️ . If you aren’t 100% satisfied with your items, or received faulty goods, simply email our customer support team at info@ecomcricket.com."
  },
  {
    HEADING: "My order has been dispatched, can i track it ?",
    CONTENT:
      "Once your order has been shipped, you’ll receive a tracking number via email. Note, it can take up to 7 days for shipping activity to update."
  },
  {
    HEADING: "What method of payment do you take?",
    CONTENT:
      "We accept ALL major credit cards, PayPal, and Apple Pay. All payments are securely processed with 128-bit encryption - nice! 💳."
  }
];

const FaqContent = () => {
  const [selected, setSelected] = React.useState(null);
  const toggle = i => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <>
      {row?.length !== 0 && (
        <div className='accordions'>
          {row.map((item, i) => (
            <div className='items'>
              <div className='title' onClick={() => toggle(i)}>
                <h6 className='title_heading'>{item.HEADING}</h6>
                <span>
                  {selected === i ? (
                    <ExpandLessIcon sx={{ transform: " scale(1)" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ transform: " scale(1)" }} />
                  )}
                </span>
              </div>
              <div className={selected === i ? "contents shows" : "contents"}>
                {item.CONTENT}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FaqContent;
