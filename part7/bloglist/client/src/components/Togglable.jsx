import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = ({ buttonLabel, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const hideIfVisible = { display: isVisible ? "none" : "" };
  const showIfVisible = { display: isVisible ? "" : "none" };

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showIfVisible}>
        {
          /* pass props to child */
          children({ toggleVisibility })
        }
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  children: PropTypes.func.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
