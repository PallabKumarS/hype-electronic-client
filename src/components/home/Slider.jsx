import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import PropTypes from "prop-types";
import MotionBtn from "../shared/MotionBtn";
import { PhotoView } from "react-photo-view";

const Slider = ({ images }) => {
  const { img1, img2, img3, img4 } = images;

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className=" keen-slider container mx-auto">
      <div className="overlay-text absolute z-10 text-center rounded-lg p-4 right-1/2 translate-x-1/2 translate-y-1/4 bg-base-100 bg-opacity-50">
        <h2 className="overlay-title font-bold text-2xl text-lime-400">
          Fast & Efficient Repair for All Devices
        </h2>
        <p className="overlay-description my-2 text-lime-400">
          We repair all kinds of electronic devices like USB devices,PC
          Components, etc.
        </p>
        <MotionBtn text={"Learn More"}></MotionBtn>
      </div>
      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img1}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img1}
            alt=""
          />
        </PhotoView>
      </div>
      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img2}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img2}
            alt=""
          />
        </PhotoView>
      </div>

      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img3}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img3}
            alt=""
          />
        </PhotoView>
      </div>
      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img4}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img4}
            alt=""
          />
        </PhotoView>
      </div>
    </div>
  );
};

Slider.propTypes = {
  images: PropTypes.object,
};

export default Slider;
