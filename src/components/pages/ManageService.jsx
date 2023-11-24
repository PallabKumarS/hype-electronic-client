import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loader from "../shared/Loader";
import { Helmet } from "react-helmet";
import { PhotoView } from "react-photo-view";
import { gradientTextClasses } from "../shared/GradientText";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import userLogo from "../../assets/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import MotionBtn from "../shared/MotionBtn";
import Map from "../shared/Map";
import useAxios from "../shared/useAxios";
import Swal from "sweetalert2";
import noData from "../../assets/noData.avif";
import Spinner from "../shared/Spinner";

const ManageService = () => {
  const axiosSecure = useAxios();
  const { user, handleAlert } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    isLoading,
    data: services,
    refetch,
  } = Loader(`/allServices?emailKey=${user?.email}`, `${user?.email}`);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/allServices/${id}?email=${user.email}`)
          .then((res) => {
            if (res.status === 200) {
              handleAlert("success", "Your service has been deleted");
            }
            refetch();
          })
          .catch((err) => {
            handleAlert("error", err.message);
          });
      }
    });
  };

  return (
    <div className="container mx-auto text-center mb-20 mt-20">
      <Helmet>
        <title>HE | Manage Services</title>
      </Helmet>
      {services.length > 0 ? (
        <div>
          {services.map((service) => (
            <div
              key={service._id}
              className="container mx-auto text-center mb-20 mt-20 grid grid-cols-1 gap-10 md:px-5"
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
                      text={[`${service.serviceName}`]}
                      size={2}
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
                      <Link to={`/update/${service._id}`}>
                        <MotionBtn text={"Update"}></MotionBtn>
                      </Link>
                      <MotionBtn
                        onClick={() => navigate(`/services/${service._id}`)}
                        text={"View Details"}
                      ></MotionBtn>
                      <MotionBtn
                        onClick={() => handleDelete(service._id)}
                        text={"Delete"}
                      ></MotionBtn>
                    </div>
                  </div>
                  <div className="mt-5 rounded-lg text-center mx-auto">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="mt-10 mb-10 text-2xl font-bold text-blue-500">
            No Data Here{" "}
            <span className="text-3xl text-rose-600 mb-3">Yet...</span>
          </h1>
          <img className="mx-auto rounded-xl" src={noData} alt="" />
        </div>
      )}
    </div>
  );
};

export default ManageService;
