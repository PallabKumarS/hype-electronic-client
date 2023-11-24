// import axios from "axios";
import { useState } from "react";
import Services from "../home/Services";
import MotionBtn from "../shared/MotionBtn";
import Loader from "../shared/Loader";
import { useEffect } from "react";
import TypeWriterCustom from "../shared/TypeWriterCustom";
import { Helmet } from "react-helmet";

const AllServices = () => {
  const { isLoading, data: services } = Loader("/services", "allServices");

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const filteredData = services.filter((service) =>
        service.serviceName.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(filteredData);
    }
  }, [isLoading, search, services]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    // const form = e.target;
    // const searchKey = form.search.value;
    // const { isLoading, data: searchedData } = Loader(
    //   `/allServices/searchKey=${searchKey}`,
    //   "searchedData"
    // );

    // console.log(isLoading, searchedData);
    // const response = await axios.get(`/allServices?searchKey=${searchKey}`);

    // const searchData = response.data;
    // console.log("Search results:", searchData);
  };

  const handleClear = () => {
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.value = "";
    }
  };

  const allServices = show ? filtered : filtered.slice(0, 6);

  return (
    <div className="text-center">
      <Helmet>
        <title>HE | All Services</title>
      </Helmet>
      <TypeWriterCustom text={["All Services We Provide"]}></TypeWriterCustom>
      <br />
      <form action="" onSubmit={handleSearch} className="">
        {/* search field here  */}
        <input
          className="text-center rounded-lg py-2 px-10 w-1/3 focus:outline-none focus:ring focus:border-blue-500 border border-gray-300"
          type="text"
          name="search"
          value={search}
          id=""
          placeholder="Search For Services With Names..."
          onChange={(e) => handleSearch(e)}
        />
        {search.length > 0 ? (
          <MotionBtn onClick={handleClear} text={"Clear"}>
            <input value="Clear" />
          </MotionBtn>
        ) : (
          <button className="btn btn-info" disabled>
            Clear
          </button>
        )}

        {/* clear button here  */}
      </form>
      <div className="mt-28 mb-10 container mx-auto text-center grid grid-cols-1 gap-7">
        {!isLoading ? (
          allServices.map((service) => (
            <Services
              key={service._id}
              service={service}
              padding={10}
              h={350}
              route={true}
            ></Services>
          ))
        ) : (
          <span className="loading loading-bars loading-lg"></span>
        )}
      </div>
      {!show && (
        <MotionBtn onClick={() => setShow(!show)} text={"Load All"}></MotionBtn>
      )}
    </div>
  );
};

export default AllServices;
