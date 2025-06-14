import { useState } from "react";
import PropTypes from "prop-types";

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const hideIfVisible = { display: isVisible ? "none" : "" };
  const showIfVisible = { display: isVisible ? "" : "none" };

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showIfVisible}>
        {
          /* pass `toggleVisibility` to children as a prop */
          props.children({ toggleVisibility })
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
