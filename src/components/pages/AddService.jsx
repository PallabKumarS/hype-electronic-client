import { useContext } from "react";
import { inputClasses } from "../shared/GradientText";
import MotionBtn from "../shared/MotionBtn";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../shared/useAxios";
import { Helmet } from "react-helmet";

const AddService = () => {
  const axiosSecure = useAxios();

  const { user, handleAlert } = useContext(AuthContext);

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
    const newService = {
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
      .post(`/allServices?email=${user.email}`, newService)
      .then((res) => {
        if (res.status === 200) {
          handleAlert("success", "Added Successfully");
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
    <div className="container mx-auto text-center mt-20 mb-20 rounded-lg">
      <Helmet>
        <title>HE | Add Service</title>
      </Helmet>
      <form
        action=""
        onSubmit={handleAddService}
        className="bg-cover bg-modalBg bg-no-repeat rounded-xl py-10"
      >
        {/* service name  */}
        <label htmlFor="" className="text-lime-500 text-xl font-semibold mb-1">
          Service Name :
        </label>
        <br />
        <input
          type="text"
          name="name"
          id=""
          required
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
          value={user.displayName}
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
          value={user.email}
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
        <div className="flex flex-col md:flex-row mx-auto justify-center gap-3 items-center">
          <input
            type="text"
            name="location"
            placeholder="e.g., 48.8566, 2.3522"
            id=""
            className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
          />{" "}
          <p className="text-lime-500 text-xl font-semibold">Or</p>
          <input
            type="text"
            name="locationText"
            id=""
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
          required
          className={`py-2 px-5 text-center ${inputClasses} rounded-lg mb-3`}
        />{" "}
        <br />
        <MotionBtn text={"Add This Service"}>
          <input type="submit" value="Submit" />
        </MotionBtn>
      </form>
    </div>
  );
};

export default AddService;
