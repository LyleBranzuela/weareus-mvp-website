import React from "react";
import "./PracticeExpendableText.css";
import { useRef, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import icon_accordion_arrow_purple from "../../assets/icons/accordion_arrow_purple.svg";

const MAX_POSSIBLE_HEIGHT = 500;

const PracticeExpendableText = ({ maxHeight, children }) => {
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
        class="internal"
        style={{ maxHeight: expanded ? MAX_POSSIBLE_HEIGHT : maxHeight }}
      >
        {children}
      </div>
      {shouldShowExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="readMoreButton"
        >
          Read More{" "}
          <img
            src={icon_accordion_arrow_purple}
            className="readMoreArrow"
          ></img>
        </button>
      )}
    </Card.Text>
  );
};

export default PracticeExpendableText;
