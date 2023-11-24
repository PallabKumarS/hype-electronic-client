import { useContext, useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";
import MotionBtn from "../shared/MotionBtn";

const Login = () => {
  const [show, setShow] = useState(false);

  const { handleAlert, googleLogIn, logIn, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    logIn(email, password)
      .then(() => {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then(() => {
        navigate(location?.state ? location.state : "/");
        handleAlert("success", "User LoggedIn Successfully");
      })
      .catch((error) => {
        handleAlert("error", `${error.message}`);
        setLoading(false);
      });
  };

  return (
    <div className="">
      <Helmet>
        <title>HE | Login</title>
      </Helmet>
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 py-5 md:w-3/4 xl:w-1/2 mx-auto mt-10 relative text-center mb-10 px-3 rounded-lg">
        <h2 className="text-3xl mt-5 mb-5 text-lime-500">Please Login Here</h2>

        <form onSubmit={handleLogIn}>
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type="email"
            name="email"
            placeholder="Enter a Valid Email"
            required
          />

          <br />
          <input
            className="w-3/4 mb-3 rounded-lg py-2 px-3 bg-black"
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter a Password"
            required
          />
          <span
            className="z-10 w-fit absolute translate-y-3/4 -translate-x-5"
            onClick={() => setShow(!show)}
          >
            {show ? <BsEyeFill></BsEyeFill> : <BsEyeSlashFill></BsEyeSlashFill>}
          </span>

          <br />
          <MotionBtn width={75} text={"Login"}>
            <input
              className="mb-3 w-3/4 py-2 px-3 text-lime-400 text-md rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
              type="submit"
              value="LogIn"
            />
          </MotionBtn>
        </form>

        <div className="text-center mx-auto mb-3">
          <p className="mb-2">Or Login Using</p>
          <FcGoogle
            onClick={handleGoogleLogIn}
            className="text-center mx-auto w-10 h-10"
          ></FcGoogle>
        </div>

        <p>
          Do not have an account? <br /> Please{" "}
          <span className="font-semibold text-lime-500 ml-2 hover:underline">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
