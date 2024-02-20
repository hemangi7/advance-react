
import CountUp from 'react-countup';
import { Link } from "react-router-dom";

const subTitle = "About our brand";
const title = "Welcome to VSH - Where Style Meets Convenience!";
const desc = `At Shoppee, we believe that shopping should be an experience that seamlessly blends style, convenience, and a touch of excitement. Our passion for providing a delightful shopping journey led us to curate a diverse collection of high-quality products, ensuring that every customer finds something they love.
Who We Are:
Founded with a vision to redefine online shopping, [Your Ecommerce Website Name] is your one-stop destination for all things trendy, innovative, and practical. We understand the dynamic nature of fashion and technology, and we're committed to staying ahead of the curve. Whether you're a fashion-forward trendsetter or a tech enthusiast, our carefully curated selection caters to all tastes and preferences.
Our Mission:
At the core of Shoppee's mission is a commitment to delivering exceptional value to our customers. We strive to create a seamless and enjoyable shopping experience by offering a wide range of products, from the latest fashion trends to cutting-edge gadgets. Our mission is to empower our customers to express their unique style, enhance their lifestyles, and stay connected with the ever-evolving world of innovation.`;
const btnText = "Apply  Now";

const countList = [
    {
        iconName: 'icofont-users-alt-4',
        count: '12600',
        text: 'Marchant Enrolled',
    },
    {
        iconName: 'icofont-graduate-alt',
        count: '30',
        text: 'Certified Courses',
    },
    {
        iconName: 'icofont-notification',
        count: '100',
        text: 'Rewards and GitCards',
    },
]

const AboutUs = () => {
  return (
    <div className="instructor-section style-2 padding-tb section-bg-ash">
    <div className="container">
        <div className="section-wrapper">
            <div className="row g-4 justify-content-center row-cols-1 row-cols-md-2 row-cols-xl-3 align-items-center">
                <div className="col">
                    {countList.map((val, i) => (
                        <div className="count-item" key={i}>
                            <div className="count-inner">
                                <div className="count-icon">
                                    <i className={val.iconName}></i>
                                </div>
                                <div className="count-content">
                                    <h2><span className="count"><CountUp end={val.count} /></span><span>+</span></h2>
                                    <p>{val.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col">
                    <div className="instructor-content">
                        <span className="subtitle">{subTitle}</span>
                        <h2 className="title">{title}</h2>
                        <p>{desc}</p>
                        <Link to="/signup" className="lab-btn"><span>{btnText}</span></Link>
                    </div>
                </div>
                <div className="col">
                    <div className="instructor-thumb">
                        <img src="src/assets/images/instructor/01.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AboutUs