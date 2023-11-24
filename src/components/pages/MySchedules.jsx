import { useContext } from "react";
import Loader from "../shared/Loader";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import { AuthContext } from "../provider/AuthProvider";
import Spinner from "../shared/Spinner";
import { Helmet } from "react-helmet";
import Map from "../shared/Map";
import { PhotoView } from "react-photo-view";
import { gradientTextClasses, inputClasses } from "../shared/GradientText";
import noData from "../../assets/noData.avif";
import userLogo from "../../assets/user.jpg";
import MotionBtn, { customButtonClasses } from "../shared/MotionBtn";
import { useNavigate } from "react-router-dom";
import PendingServices from "./PendingServices";
import useAxios from "../shared/useAxios";
import Swal from "sweetalert2";
import TextColor from "../shared/TextColor";

const MySchedules = () => {
  const axiosSecure = useAxios();
  const { user, handleAlert } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    isLoading: loading1,
    data: service,
    refetch,
  } = Loader(`/bookings/${user?.email}`, `${user?.email}`);

  if (loading1) {
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
          .delete(`/bookings/${id}?email=${user.email}`)
          .then((res) => {
            if (res.status === 200) {
              handleAlert("success", "Your booking has been deleted");
            }
            refetch();
          })
          .catch((err) => {
            handleAlert("error", err.message);
          });
      }
    });
  };

  const handleDateChange = (e, id) => {
    const form = e.target;
    const date = form.date.value;
    const changedState = {
      date,
    };
    axiosSecure
      .put(`/bookings/${id}?email=${user?.email}`, changedState)
      .then((res) => {
        if (res.data.modifiedCount) {
          handleAlert("success", "Date Changed Successfully");
        }
        refetch();
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <div className="container mx-auto text-center mt-10 mb-10 pb-10">
      <Helmet>
        <title>HE | Schedules</title>
      </Helmet>
      <div className="mb-5">
        <TypeWriterCustom
          text={["Your Bookings Will Be Shown Here"]}
          size={3}
        ></TypeWriterCustom>
      </div>

      {service.length > 0 ? (
        <div className="mb-20">
          {!loading1 &&
            service.map((service) => (
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
                          className={`max-h-[550px] max-w-[1100px] rounded-lg mx-auto`}
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
                    </p>
                    <br />
                    <p className={`${gradientTextClasses} font-bold mb-3`}>
                      Price : ${service.price}
                    </p>
                    <div className="text-center mt-3">
                      <p className="mb-3 text-lg font-semibold text-rose-600">
                        Provider Info
                      </p>
                      <div className=" flex flex-col md:flex-row items-center justify-between px-5 mb-5 md:w-3/4 mx-auto">
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
                          <p className="text-center font-semibold text-lg text-blueViolet mb-3">
                            Name : {service.providerName}
                          </p>{" "}
                          <br />
                          <p className="text-center font-semibold text-lg text-lime-500 mb-3">
                            Booked For : {service.date}
                          </p>
                          <br />
                          <p className="font-semibold text-lg text-lime-500 mb-3">
                            Status : {TextColor(service.status)}
                          </p>
                          <br />
                          <form
                            action=""
                            onSubmit={(e) => handleDateChange(e, service?._id)}
                          >
                            <input
                              className={` py-2 px-5 text-center ${inputClasses} rounded-lg mb-3 text-lime-500`}
                              type="date"
                              name="date"
                              id=""
                              title="Click To Change Booked Date"
                              defaultValue={service.date}
                            />{" "}
                            <br />
                            <MotionBtn text={"Change"}>
                              <input type="submit" value="Change" />
                            </MotionBtn>
                          </form>
                        </div>
                      </div>
                      <MotionBtn
                        onClick={() => handleDelete(service?._id)}
                        text={"Delete"}
                      ></MotionBtn>
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
              onClick={() => navigate("/allServices")}
              className={` text-rose-500 ${customButtonClasses}`}
            >
              Here
            </span>{" "}
            To Book Some Services
          </p>
        </div>
      )}
      <div className="mt-5 mb-5">
        <TypeWriterCustom
          text={["Your Works will Be Shown Here If It Gets Booked"]}
          size={3}
        ></TypeWriterCustom>
      </div>
      <PendingServices></PendingServices>
    </div>
  );
};

export default MySchedules;
