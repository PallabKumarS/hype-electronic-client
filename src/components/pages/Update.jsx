import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import Loader from "../shared/Loader";
import { inputClasses } from "../shared/GradientText";
import MotionBtn from "../shared/MotionBtn";
import useAxios from "../shared/useAxios";
import Spinner from "../shared/Spinner";
import { Helmet } from "react-helmet";

const Update = () => {
  const axiosSecure = useAxios();
  const { id } = useParams();
  const { user, handleAlert } = useContext(AuthContext);

  const { isLoading, data: service } = Loader(
    `/allServices/${id}?email=${user.email}`,
    `${id}`
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const [serviceArea1, serviceArea2] = handleLocationChange(location);
    const locationText = form.locationText.value;
    const serviceName = form.name.value;
    const serviceImage = form.image.value;
    const serviceInfo = form.info.value;
    const price = form.price.value;
    const providerEmail = form.providerEmail.value;
    const providerName = form.providerName.value;
    const providerImage = form.providerImage.value;
    if (!locationText) {
      handleAlert("error", "Please Enter Any Type Of Location");
      if (!locationText) {
        handleAlert("error", "Please Enter Any Type Of Location");
        return;
      }
    }
    const updatedService = {
      serviceArea1,
      serviceArea2,
      locationText,
      serviceImage,
      serviceName,
      serviceInfo,
      price,
      providerEmail,
      providerName,
      providerImage,
    };

    axiosSecure
      .put(`/updateService/${id}?email=${user.email}`, updatedService)
      .then((res) => {
        if (res.status === 200) {
          handleAlert("success", "Updated Successfully");
        }
      })
      .catch((err) => {
        handleAlert("error", err.message);
      });
  };
  const handleLocationChange = (time) => {
    if (Array.isArray(time)) {
      const [lat, lon] = time
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lon)) {
        return [lat, lon];
      }
    } else {
      return ["", ""];
    }
  };
  return (
    <div>
      <Helmet>
        <title>HE | Update {service?.serviceName}</title>
      </Helmet>
      <div className="container mx-auto text-center mt-20 mb-20 rounded-lg">
        {/* modal here  */}
        <div>
          <form
            onSubmit={handleAddService}
            action=""
            className="bg-cover bg-modalBg bg-opacity-50 bg-no-repeat rounded-xl py-10"
          >
            {/* service name  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1"
            >
              Service Name :
            </label>
            <br />
            <input
              type="text"
              name="name"
              id=""
              required
              defaultValue={service.serviceName}
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            {/* service image url  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Service Image URL :
            </label>
            <br />
            <input
              type="text"
              name="image"
              id=""
              required
              defaultValue={service.serviceImage}
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            {/* provider name */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Your Name :
            </label>
            <br />
            <input
              type="text"
              name="providerName"
              id=""
              readOnly
              defaultValue={user.displayName}
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            {/* provider email address  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Your Email :
            </label>
            <br />
            <input
              type="email"
              name="providerEmail"
              id=""
              readOnly
              defaultValue={user.email}
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            {/* provider image  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Your Image URL :
            </label>
            <br />
            <input
              type="text"
              name="providerImage"
              id=""
              placeholder="optional"
              defaultValue={user.photoURL}
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            {/* provider location  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Location :
            </label>
            <br />
            <div className="flex flex-col mx-auto justify-center gap-3 items-center">
              <input
                type="text"
                name="location"
                placeholder="e.g., 48.8566, 2.3522"
                id=""
                defaultValue={(service.serviceArea1, service.serviceArea2)}
                className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
              />{" "}
              <p className="text-lime-500 text-xl font-semibold">Or</p>
              <input
                type="text"
                name="locationText"
                id=""
                defaultValue={service.locationText}
                placeholder="eg., Elephant Road,Dhaka,Bangladesh"
                className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
              />
            </div>
            <br />
            {/* service description  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              Service Description :
            </label>
            <br />
            <textarea
              name="info"
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
              placeholder="You Must Describe About Your Service"
              required
              defaultValue={service.serviceInfo}
            ></textarea>
            <br />
            {/* price  */}
            <label
              htmlFor=""
              className="text-lime-500 text-xl font-semibold mb-1 mt-2"
            >
              price :
            </label>
            <br />
            <input
              type="number"
              name="price"
              id=""
              defaultValue={service.price}
              required
              className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
            />{" "}
            <br />
            <MotionBtn text={"Update This Service"}>
              <input type="submit" value="Submit" />
            </MotionBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
