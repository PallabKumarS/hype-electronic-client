import { useContext } from "react";
import useAxios from "../shared/useAxios";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../shared/Loader";
import { PhotoView } from "react-photo-view";
import { gradientTextClasses, inputClasses } from "../shared/GradientText";
import userLogo from "../../assets/user.jpg";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import Map from "../shared/Map";
import { customButtonClasses } from "../shared/MotionBtn";
import noData from "../../assets/noData.avif";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/Spinner";
import TextColor from "../shared/TextColor";

const PendingServices = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { user, handleAlert } = useContext(AuthContext);
  const {
    isLoading,
    data: pendings,
    refetch,
  } = Loader(`/myBookings/${user?.email}`);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  const handleStatusChange = (e, id) => {
    const status = e.target.value;
    const changedState = {
      status,
    };
    axiosSecure
      .put(`/myBookings/${id}?email=${user?.email}`, changedState)
      .then((res) => {
        if (res.status == 200) {
          handleAlert("success", "Status Changed Successfully");
        }
        refetch();
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };
  return (
    <div className="container mx-auto text-center mt-10 mb-10 pb-10">
      {pendings.length > 0 ? (
        <div className="mb-20 pb-10">
          {pendings.map((service) => (
            <div
              key={service._id}
              className="container mx-auto text-center mb-20 mt-20 grid grid-cols-1 gap-10 md:px-5"
            >
              <div className="shadow-xl bg-base-200 rounded-xl">
                <div className="rounded-lg mx-auto text-center bg-base-200 pb-5 mt-10">
                  <div className={`rounded-lg pt-10}`}>
                    <PhotoView src={service.serviceImage}>
                      <img
                        src={service.serviceImage}
                        className={`h-2/3 rounded-lg mx-auto`}
                        alt=""
                      />
                    </PhotoView>
                  </div>

                  <div className="mt-3 mb-3">
                    <TypeWriterCustom
                      text={[`${service.serviceName}`]}
                      size={2}
                    ></TypeWriterCustom>
                  </div>

                  <p
                    className={`"text-md font-medium p-4 mb-3" ${gradientTextClasses}`}
                  >
                    {service.serviceInfo}
                  </p>
                  <br />
                  <p className={`"font-bold mb-3" ${gradientTextClasses}`}>
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
                        </p>{" "}
                        <br />
                        <p className="font-semibold text-lg text-lime-500 mb-3">
                          Status : {TextColor(service.status)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg text-center mx-auto mb-5">
                    {typeof service.serviceArea1 === "number" &&
                    typeof service.serviceArea2 === "number" ? (
                      <Map
                        position={[service.serviceArea1, service.serviceArea2]}
                        popUp={service.providerName}
                      ></Map>
                    ) : (
                      <p className="text-xl font-bold text-rose-500">
                        Location : {service.locationText.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="text-xl font-bold mb-3 mr-2 text-blueViolet"
                    >
                      Select Status :
                    </label>
                    <select
                      className={`${inputClasses} text-rose-500 rounded-md py-1 px-2`}
                      id="status"
                      defaultValue={service.status}
                      onChange={(e) => handleStatusChange(e, service._id)}
                    >
                      <option className="text-yellow-500" value="Pending">
                        Pending
                      </option>
                      <option className="text-blue-500" value="In Progress">
                        In Progress
                      </option>
                      <option className="text-lime-500" value="Completed">
                        Completed
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto items-center mb-20">
          <h1 className="mt-10 mb-10 text-2xl font-bold text-blue-500">
            No Data Here{" "}
            <span className="text-3xl text-rose-600 mb-3">Yet...</span>
          </h1>
          <img className="mx-auto rounded-xl mb-5" src={noData} alt="" />
          <p className="text-xl font-semibold text-lime-500">
            Visit{" "}
            <span
              onClick={() => navigate("/addService")}
              className={` text-rose-500 ${customButtonClasses}`}
            >
              Here
            </span>{" "}
            To Add Some Services
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingServices;
