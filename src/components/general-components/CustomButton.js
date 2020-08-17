import "./CustomButton.css";
import React from "react";
import { Button } from "react-bootstrap";

// Custom Button Button that can be refactored for multiple styles
const CustomButton = (props) => (
  <Button
    className="primaryCustomButtonStyle"
    id={props.id}
    variant="primary"
    type={props.type}
  >
    {props.text}
  </Button>
);

export default CustomButton;
