import { PhotoView } from "react-photo-view";
import Loader from "../shared/Loader";
import { Link, useParams } from "react-router-dom";
import { gradientTextClasses, inputClasses } from "../shared/GradientText";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import Map from "../shared/Map";
import MotionBtn, { customButtonClasses } from "../shared/MotionBtn";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../shared/useAxios";
import Spinner from "../shared/Spinner";
// import userLogo from "../../assets/user.jpg";
import OtherServices from "./OtherServices";

const SingleService = () => {
  const axiosSecure = useAxios();
  // const navigate = useNavigate();
  const { user, handleAlert } = useContext(AuthContext);
  const { id } = useParams();
  const { isLoading, data: service } = Loader(
    `/allServices/${id}?email=${user.email}`,
    `${id}`
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const {
    serviceImage,
    serviceName,
    serviceInfo,
    providerName,
    providerImage,
    providerInfo,
    price,
    serviceArea1,
    serviceArea2,
    providerEmail,
    locationText,
  } = service;

  const handleModal = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const instruction = form.info.value;
    const userEmail = form.userEmail.value;
    const status = "Pending";
    document.getElementById("myModal").close(true);

    const booking = {
      serviceImage,
      serviceName,
      serviceInfo,
      providerName,
      providerImage,
      providerInfo,
      price,
      serviceArea1,
      serviceArea2,
      providerEmail,
      locationText,
      date,
      instruction,
      userEmail,
      status,
    };

    axiosSecure
      .post(`/bookings?email=${user.email}`, booking)
      .then((res) => {
        if (res.status === 200) {
          handleAlert("success", "Booked Successfully");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };

  return (
    <div className="container mx-auto text-center px-2 mt-20">
      <Helmet>
        <title>HE | {serviceName}</title>
      </Helmet>
      {/* provider information  */}
      <div className="rounded-lg mx-auto text-center shadow-xl bg-base-200 pb-5 mb-20">
        <div className="text-center pt-10">
          <p className="mb-3 text-xl font-semibold text-rose-600">
            Provider Info
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between px-5 mb-3 md:w-3/4 gap-5 mx-auto">
            <PhotoView src={providerImage}>
              <img
                className="mx-auto h-40 rounded-lg"
                src={providerImage}
                alt=""
              />
            </PhotoView>
            <div className="flex-1">
              <p className="font-semibold text-lg text-blueViolet mb-3">
                Name : {providerName}
              </p>
              <br />

              {providerInfo ? (
                <p className="font-semibold text-lg text-lime-500">
                  {providerInfo}{" "}
                </p>
              ) : (
                <p className="text-lg text-lime-500 font-semibold">
                  No Provider Info Provided
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg mb-10">
          {typeof serviceArea1 === "number" &&
          typeof serviceArea2 === "number" ? (
            <Map
              position={[serviceArea1, serviceArea2]}
              popUp={providerName}
            ></Map>
          ) : (
            <p className="text-xl font-bold text-rose-500">
              Location : {locationText.toUpperCase()}
            </p>
          )}
        </div>
      </div>
      {/* service information  */}
      <div className="rounded-lg mx-auto text-center shadow-xl bg-base-200 pt-10 pb-5">
        <h3 className="mb-3 text-xl font-semibold text-rose-600">
          Service Information
        </h3>
        <div className={`rounded-lg mt-5`}>
          <PhotoView src={serviceImage}>
            <img
              src={serviceImage}
              className={`max-h-[550px] max-w-[1100px] rounded-lg mx-auto`}
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
          {serviceInfo}
        </p>
        <br />
        <p className={`${gradientTextClasses} font-bold mb-3`}>
          Price : ${price}
        </p>
        <div className="text-center pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between px-5 mb-3 md:w-3/4 mx-auto">
            <PhotoView src={providerImage}>
              <img
                className="mx-auto h-40 rounded-lg"
                src={providerImage}
                alt=""
              />
            </PhotoView>
            <div className="flex-1 text-center">
              <p className="font-semibold text-lg text-blueViolet mb-3">
                Name : {providerName}
              </p>
            </div>
          </div>
          {user ? (
            <MotionBtn
              className={`${customButtonClasses}`}
              onClick={() => document.getElementById("myModal").showModal(true)}
              text={"Book Now"}
            ></MotionBtn>
          ) : (
            <div className="text-center">
              <p className="font-semibold text-lg mb-2 text-rose-500">
                Please Login First
              </p>
              <Link to={`/login`}>
                <MotionBtn text={"Login"}></MotionBtn>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* modal here  */}
      <div>
        {user && (
          <dialog id="myModal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <form action="" onSubmit={handleModal}>
                {/* service name  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1"
                >
                  Service Name :
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  id=""
                  readOnly
                  defaultValue={serviceName}
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                />{" "}
                <br />
                {/* service image url  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  Service Image URL :
                </label>
                <br />
                <input
                  type="text"
                  name="image"
                  id=""
                  readOnly
                  defaultValue={serviceImage}
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                />{" "}
                <br />
                {/* provider email address */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  Provider Email :
                </label>
                <br />
                <input
                  type="email"
                  name="providerEmail"
                  id=""
                  readOnly
                  defaultValue={providerEmail}
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                />{" "}
                <br />
                {/* user email address  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  Your Email :
                </label>
                <br />
                <input
                  type="email"
                  name="userEmail"
                  id=""
                  readOnly
                  defaultValue={user.email}
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                />{" "}
                <br />
                {/* date of service  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  Date Of Service :
                </label>
                <br />
                <input
                  type="date"
                  name="date"
                  id=""
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                  required
                />{" "}
                <br />
                {/* special instruction  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  Special Instruction :
                </label>
                <br />
                <textarea
                  name="info"
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                  placeholder="Special Instruction"
                ></textarea>
                <br />
                {/* price  */}
                <label
                  htmlFor=""
                  className="text-lime-400 text-md font-semibold mb-1 mt-2"
                >
                  price :
                </label>
                <br />
                <input
                  type="number"
                  name="price"
                  id=""
                  readOnly
                  defaultValue={price}
                  className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
                />{" "}
                <br />
                <MotionBtn text={"Purchase This Service"}>
                  <input type="submit" value="Submit" />
                </MotionBtn>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button
                    className={`absolute top-3 right-6 ${gradientTextClasses} text-xl font-bold`}
                  >
                    X
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        )}
      </div>
      <div className="mt-10 mb-10">
        <TypeWriterCustom
          text={["Other Services By Of This Provider"]}
        ></TypeWriterCustom>
      </div>

      <OtherServices
        email={service.providerEmail}
        service={service}
      ></OtherServices>
    </div>
  );
};

export default SingleService;
