import groovyWalkAnimation from "../../assets/groovyWalkAnimation.gif";

const Spinner = () => {
  return (
    <div className="container mx-auto mt-10 text-center px-2">
      <img className="mx-auto" src={groovyWalkAnimation} alt="" />
      {/* <span className="loading loading-bars loading-lg"></span> */}
    </div>
  );
};

export default Spinner;
