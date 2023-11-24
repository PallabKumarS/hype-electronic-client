import PropTypes from "prop-types";
import { gradientTextClasses } from "../shared/GradientText";
import MotionBtn from "../shared/MotionBtn";
import { Link, useNavigate } from "react-router-dom";
// import MotionDiv from "../shared/MotionDiv";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import { PhotoView } from "react-photo-view";
import userLogo from "../../assets/user.jpg";

const Services = ({ service, padding = null, route = false }) => {
  const navigate = useNavigate();
  const {
    _id,
    serviceImage,
    serviceName,
    serviceInfo,
    providerName,
    providerImage,
    price,
  } = service;

  return (
    <div className="shadow-xl bg-base-200 rounded-xl">
      <div className="rounded-lg mx-auto text-center bg-base-200 pb-5">
        <div className={`rounded-lg pt-${padding} px-5`}>
          <PhotoView src={serviceImage}>
            <img
              src={serviceImage}
              className={`h-[500px] rounded-lg mx-auto`}
              alt=""
            />
          </PhotoView>
        </div>
        <div>
          <TypeWriterCustom
            text={[`${serviceName}`]}
            size={2}
          ></TypeWriterCustom>
        </div>
        <p
          className={`text-lg font-medium p-4 mb-3 md:w-3/4 mx-auto ${gradientTextClasses}`}
        >
          {serviceInfo.length > 100 ? (
            <span>{serviceInfo.slice(0, 100)}...</span>
          ) : (
            <span>{serviceInfo}</span>
          )}
        </p>
        <br />
        <p className={`${gradientTextClasses} font-bold mb-3`}>
          Price : ${price}
        </p>
        <div className="text-center mt-3">
          <p className="mb-3 text-lg font-semibold text-rose-600">
            Provider Info
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between px-5 mb-3 md:w-3/4 mx-auto">
            <PhotoView src={providerImage ? providerImage : userLogo}>
              <img
                className="mx-auto h-40 rounded-lg"
                src={providerImage ? providerImage : userLogo}
                alt=""
              />
            </PhotoView>
            <div className="flex-1">
              <p className="font-semibold text-lg text-blueViolet mb-3">
                Name : {providerName}
              </p>
            </div>
          </div>
          {!route ? (
            <Link to={`services/${_id}`} className="mb-5">
              <MotionBtn text={"View Details"}></MotionBtn>
            </Link>
          ) : (
            <MotionBtn
              onClick={() => navigate(`/services/${_id}`)}
              text={"View Details"}
            ></MotionBtn>
          )}
        </div>
      </div>
    </div>
  );
};

Services.propTypes = {
  service: PropTypes.object,
  padding: PropTypes.number,
  h: PropTypes.number,
  route: PropTypes.bool,
};

export default Services;
