import React from 'react'
import PageHeader from '../../components/PageHeader';
const subTitle = "About Our Brand";
const title = "Welcome to ShopCart - Where Style Meets Convenience!";
const desc = `At ShopCart, we believe that shopping should be an experience that seamlessly blends style, convenience, and a touch of excitement. Our passion for providing a delightful shopping journey led us to curate a diverse collection of high-quality products, ensuring that every customer finds something they love.
Who We Are:
Founded with a vision to redefine online shopping, ShopCart is your one-stop destination for all things trendy, innovative, and practical. We understand the dynamic nature of fashion and technology, and we're committed to staying ahead of the curve. Whether you're a fashion-forward trendsetter or a tech enthusiast, our carefully curated selection caters to all tastes and preferences.
Our Mission:
At the core of ShopCart's mission is a commitment to delivering exceptional value to our customers. We strive to create a seamless and enjoyable shopping experience by offering a wide range of products, from the latest fashion trends to cutting-edge gadgets. Our mission is to empower our customers to express their unique style, enhance their lifestyles, and stay connected with the ever-evolving world of innovation.`;

const year = "30+";
const expareance = "Years Of Experiences";

const privpolicy = `Privacy Policy:
At ShopCart, we are committed to ensuring the privacy and security of our users. This Privacy Policy outlines how we collect, use, and protect your personal information. By using our platform, you agree to the terms outlined in this policy.`;

const faqtitle = 'Frequently Asked Questions(FAQ)';
const faqContent = [
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods, including credit/debit cards and Net Banking. Our secure payment gateway, powered by Razorpay, ensures safe transactions.",
    },
    {
      question: "What is your return policy?",
      answer: "If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Refer to our Returns and Exchanges page for detailed instructions.",
    },
    {
      question: "How secure is my personal information?",
      answer: "We take data security seriously. Your personal information is encrypted, and we follow industry-standard practices to protect your data. For more details, refer to our Privacy Policy.",
    },
  ];
  
  const FaqComponent = () => {
    return (
      <div>
        {faqContent.map((item, index) => (
          <div key={index}>
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    );
  }
  
  // Render the FaqComponent in your main component
  
const aboutList = [
    {
        imgUrl: '/src/assets/images/about/icon/01.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Skilled Instructors',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
    {
        imgUrl: '/src/assets/images/about/icon/02.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Get Certificate',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
    {
        imgUrl: '/src/assets/images/about/icon/03.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Online Classes',
        desc: 'Distinctively provide acces mutfuncto users whereas communicate leveraged services',
    },
]

const About = () => {
  return (
    <div>
        <PageHeader title={'About Our Brand'} curPage={'About'} />
        <div className="about-section style-3 padding-tb section-bg">
                <div className="container">
                    <div className="row justify-content-center row-cols-xl-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="about-left">
                                <div className="about-thumb">
                                    <img src="/src/assets/images/about/01.jpg" alt="about" />
                                </div>
                                <div className="abs-thumb">
                                    <img src="/src/assets/images/about/02.jpg" alt="about" />
                                </div>
                                <div className="about-left-content">
                                    <h3>{year}</h3>
                                    <p>{expareance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="about-right">
                                <div className="section-header">
                                    <span className="subtitle">{subTitle}</span>
                                    <h2 className="title">{title}</h2>
                                    <p>{desc}</p>
                                </div>
                                <div className="section-wrapper">
                                    {/* <ul className="lab-ul">
                                        {aboutList.map((val, i) => (
                                            <li key={i}>
                                                <div className="sr-left">
                                                    <img src={`${val.imgUrl}`} alt={`${val.imgAlt}`} />
                                                </div>
                                                <div className="sr-right">
                                                    <h5>{val.title}</h5>
                                                    <p>{val.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul> */}
                                    <div className="section-header">
                                    <p>{privpolicy}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h3>{faqtitle}</h3>
                </div>
                    <div className='faq-content'>
                        {faqContent.map((item, index) => (
                        <div key={index}>
                            <h4>{item.question}</h4>
                            <p>{item.answer}</p>
                        </div>
                        ))}
                    </div>
                
            </div>
    </div>
  )
}

export default About