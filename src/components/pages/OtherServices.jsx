/* eslint-disable react/prop-types */
import { PhotoView } from "react-photo-view";
import Loader from "../shared/Loader";
import { useNavigate } from "react-router-dom";
import { gradientTextClasses } from "../shared/GradientText";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import Map from "../shared/Map";
import MotionBtn from "../shared/MotionBtn";
// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import useAxios from "../shared/useAxios";
import Spinner from "../shared/Spinner";
import userLogo from "../../assets/user.jpg";

const OtherServices = ({ email, service }) => {
  const navigate = useNavigate();

  const { isLoading: loading2, data: works } = Loader(
    `/services/${email}`,
    `${email}`
  );

  if (loading2) {
    return <Spinner></Spinner>;
  }

  const filtered =
    works.length > 0 && works.filter((work) => work._id !== service._id);
  return (
    <div className="container mx-auto text-center px-2 mt-20">
      <div>
        {filtered.length > 0 && (
          <div>
            {filtered.map((service) => (
              <div
                key={service._id}
                className="container mx-auto text-center mb-20 mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:px-5"
              >
                <div className="shadow-xl bg-base-200 rounded-xl">
                  <div className="rounded-lg mx-auto text-center bg-base-200 pb-5">
                    <div className={`rounded-lg pt-10}`}>
                      <PhotoView src={service.serviceImage}>
                        <img
                          src={service.serviceImage}
                          className={`max-h-[700px] rounded-lg mx-auto`}
                          alt=""
                        />
                      </PhotoView>
                    </div>
                    <div>
                      <TypeWriterCustom
                        words={[`${service.serviceName}`]}
                        text={2}
                      ></TypeWriterCustom>
                    </div>
                    <p
                      className={`text-md font-medium p-4 mb-3 ${gradientTextClasses}`}
                    >
                      {service.serviceInfo}
                    </p>{" "}
                    <br />
                    <p className={`${gradientTextClasses} font-bold mb-3`}>
                      Price : ${service.price}
                    </p>
                    <div className="text-center mt-3">
                      <p className="mb-3 text-lg font-semibold text-rose-600">
                        Provider Info
                      </p>
                      <div className="flex flex-col md:flex-row items-center justify-between px-5 mb-5 md:w-3/4 mx-auto">
                        <PhotoView
                          src={
                            service.providerImage
                              ? service.providerImage
                              : userLogo
                          }
                        >
                          <img
                            className="mx-auto h-40 rounded-lg"
                            src={
                              service.providerImage
                                ? service.providerImage
                                : userLogo
                            }
                            alt=""
                          />
                        </PhotoView>
                        <div className="flex-1">
                          <p className="font-semibold text-lg text-blueViolet mb-3">
                            Name : {service.providerName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center mx-auto items-center mb-5 gap-10">
                        <MotionBtn
                          onClick={() => navigate(`/services/${service._id}`)}
                          text={"View Details"}
                        ></MotionBtn>
                      </div>
                    </div>
                    <div className="mt-5 rounded-lg text-center mx-auto">
                      {typeof service.serviceArea1 === "number" &&
                      typeof service.serviceArea2 === "number" ? (
                        <Map
                          position={[
                            service.serviceArea1,
                            service.serviceArea2,
                          ]}
                          popUp={service.providerName}
                        ></Map>
                      ) : (
                        <p className="text-xl font-bold text-rose-500">
                          Location : {service.locationText.toUpperCase()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherServices;
