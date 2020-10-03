import React from "react";
import "./ExpendableText.css";
import { useRef, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import icon_accordion_arrow_purple from "../../assets/icons/accordion_arrow_purple.svg";
import icon_accordion_arrow_upwards_purple from "../../assets/icons/accordion_arrow_upwards_purple.svg";

const MAX_POSSIBLE_HEIGHT = 500;

const ExpendableText = ({ maxHeight, children }) => {
  const ref = useRef();
  const [shouldShowExpand, setShouldShowExpand] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (ref.current.scrollHeight > maxHeight) {
      setShouldShowExpand(true);
      setExpanded(false);
    }
  }, [maxHeight]);

  return (
    <Card.Text ref={ref}>
      <div
        class="inner"
        style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight }}
      >
        {children}
      </div>
      {shouldShowExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="read-more-button"
        >
          Read More{" "}
          <img
            src={icon_accordion_arrow_purple}
            className="read-more-arrow"
          ></img>
        </button>
      )}
    </Card.Text>
  );
};

export default ExpendableText;
