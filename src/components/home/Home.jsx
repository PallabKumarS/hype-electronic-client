import { Helmet } from "react-helmet";
import img1 from "../../assets/banner1.jpg";
import img2 from "../../assets/banner2.webp";
import img3 from "../../assets/banner3.jpg";
import img4 from "../../assets/banner4.webp";
import Slider from "./Slider";
import Loader from "../shared/Loader";
import Services from "./Services";
import MotionBtn from "../shared/MotionBtn";
import { Link } from "react-router-dom";
import TypeWriterCustom from "../shared/TypeWriterCustom";

import Spinner from "../shared/Spinner";
import AboutUs from "./AboutUs";
import Feedback from "./Feedback";
import Faq from "./FAQ";

const images = { img1, img2, img3, img4 };

const Home = () => {
  const { isLoading, data: services } = Loader("/services", "services");

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="container px-2 text-center  mx-auto">
      {/* helmet is used here  */}
      <Helmet>
        <title>HE | Home</title>
      </Helmet>
      <TypeWriterCustom
        text={["Welcome To Our Shop Hope We Can Satisfy Your Needs"]}
        size={3}
      ></TypeWriterCustom>

      {/* slider here  */}
      <div className="mt-20">
        <Slider images={images}></Slider>
      </div>

      {/* services here  */}
      <div className="text-center">
        <TypeWriterCustom
          words={["Services We Provide"]}
          text={4}
        ></TypeWriterCustom>
        <div className="mt-28 mb-20 container mx-auto text-center grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!isLoading &&
            services
              .slice(0, 4)
              .map((service) => (
                <Services
                  key={service._id}
                  service={service}
                  padding={10}
                ></Services>
              ))}
        </div>
        <Link to="allServices">
          <MotionBtn text={"Show All"}></MotionBtn>
        </Link>
      </div>
      <div className="my-12">
        <Feedback></Feedback>
      </div>
      <div className="mb-12">
        <div>
          <TypeWriterCustom
            text={["Frequently Asked Question"]}
          ></TypeWriterCustom>
        </div>
        <Faq></Faq>
      </div>
      <div className="mb-12">
        <AboutUs></AboutUs>
      </div>
    </div>
  );
};

export default Home;
