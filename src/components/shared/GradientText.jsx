import PropTypes from "prop-types";

export const gradientTextClasses =
  "bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text";

export const inputClasses =
  "focus:outline-none focus:ring focus:border-blue-500 border border-gray-300";

const GradientText = ({ children, center = null }) => {
  return (
    <div className={`${gradientTextClasses}`} style={{ textAlign: center }}>
      {children}
    </div>
  );
};

GradientText.propTypes = {
  children: PropTypes.node,
  center: PropTypes.string,
};

export default GradientText;
