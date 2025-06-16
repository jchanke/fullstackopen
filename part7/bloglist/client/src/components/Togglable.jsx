import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const hideIfVisible = { display: isVisible ? "none" : "" };
  const showIfVisible = { display: isVisible ? "" : "none" };

  return (
    <div>
      <div style={hideIfVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showIfVisible}>
        {
          /* pass `toggleVisibility` to children as a prop */
          props.children({ toggleVisibility })
        }
        <Button onClick={toggleVisibility} variant="surface">
          cancel
        </Button>
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
