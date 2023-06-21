import "./style.scss";
import { aboutUsData, aboutUsImage } from "../../../JSON_DB/aboutUsInfo";
import aboutimg from "../../../assets/nav-logo.png";
import Footer from "../../Footer/Footer";
const AboutUs = () => {
  return (
    <>
      <section className='about-us-container'>
        <div className='heading'>About Us</div>
        <div className='about-us__content-container'>
          <img src={aboutimg} alt='about us' />
          <div className='about-us__side-content-container'>
            {aboutUsData.map(data => (
              <div className='about-us__side-content' key={data.id}>
                <div className='info-title'>{data.title}</div>
                <div className='info-body'>{data.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
