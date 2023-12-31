import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll, useSpring } from "framer-motion";

const Root = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    top: "5rem",
  });
  return (
    <div className="">
      <NavBar></NavBar>
      <motion.div
        className="fixed top-18 left-0 right-0 h-2 bg-blueViolet origin-[0] z-50 overflow-hidden"
        style={{ scaleX }}
      />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
