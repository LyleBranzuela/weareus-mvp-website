import React from "react";
import "./TopContent.css";

function TopContent() {
  return (
    <div>
      <hr></hr>
      <div className="container-fluid aboutFluidContainer">
        <h2 id="aboutTitle">About us</h2>
        <p className="about-paragraph">
          We're all on a journey. Having the right people with us on our journey
          can ground <br />
          us, grow us and help us be of service to others on their journey.
          <br />
          <br />
          But choosing the right people to help us can be difficult. That's why
          so many of us <br />
          ask our friends and family for recommendations, or go online and read
          reviews.
        </p>
        <hr id="linePadding"></hr>
      </div>
    </div>
  );
}

export default TopContent;
