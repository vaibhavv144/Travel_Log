import React from "react";
import "../TourCard/card.css";
import { Link } from "react-router-dom";
function Card(props) {
  return (
      <div className="figure">

          <img src={props.Image} />
          <figcaption>

              <p className="name">{props.place}</p>
              <p className="info">{props.p}</p>

              <Link to={{ pathname: "/card", state: { Image: props.Image, p: props.p } }} >
              </Link>

          </figcaption>

      </div>
  )
}

export default Card