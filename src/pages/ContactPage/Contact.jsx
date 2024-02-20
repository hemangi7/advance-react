import React from "react";
import {useState} from 'react';
import emailjs from "emailjs-com";
import GoogleMap from "../../components/Sidebar/GoogleMap";
import PageHeader from "../../components/PageHeader";

const subTitle = "Get in touch with us";
const title = "We're Always Eager To Hear From You!";
const conSubTitle = "Get in touch with Contact us";
const conTitle =
  "Fill The Form Below So We Can Get To Know You And Your Needs Better.";
const btnText = "Send Message";

const contactList = [
  {
    imgUrl: "/src/assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "1201 park street, Fifth Avenue",
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+22698 745 632,02 982 745",
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "admin@shopcart.com",
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.shopcart.com",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Use the emailjs.send() method to send the email
    emailjs.send(
      "service_p2cajch", // Replace with your EmailJS service ID
      "template_g5v9l2w", // Replace with your EmailJS template ID
      formData,
      "01ToesWhkMGnGAJ1i" // Replace with your EmailJS user ID
    )
      .then((response) => {
        console.log("Email sent successfully:", response);
        // You can add a success message or redirect the user
        setFormData({
          name: "",
          email: "",
          number: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
        // Handle the error, show an error message, or redirect the user
      });
  };

  return (
    <div>
      <PageHeader title={"Get In Touch With Us"} curPage={"Contact Us"} />
      <div className="map-address-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((val, i) => (
                    <div className="contact-item" key={i}>
                      <div className="contact-thumb">
                        <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{val.title}</h6>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-12">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{conSubTitle}</span>
            <h2 className="title">{conTitle}</h2>
          </div>
          <div className="section-wrapper">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name *" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input type="text" name="email" placeholder="Your Email *" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="number"
                  placeholder="Mobile Number *"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject *"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group w-100">
                <textarea
                  rows="8"
                  type="text"
                  placeholder="Your Message"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-group w-100 text-center">
                <button className="lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
