import React from "react";
import "./Card.css";

/** Card: displays image.
 * 
 * Props:
 * - caption: string describing the image
 * - src: string for the image link
 * - currNum: integer for what image we're on
 * - totalNum: integer for how many images are in the collection
 * 
 * State:
 * - none
 * 
 * App --> Carousel --> Card
 */

function Card({ caption, src, currNum, totalNum, currCardIdx }) {

  return (
    <div className="Card" data-testid={`card`} data-curr-card-idx={currCardIdx}>
      <h4 className="Card-title">{caption}</h4>
      <img className="Card-image" src={src} alt={caption} />
      <small className="Card-small">
        Image {currNum} of {totalNum}.
      </small>
    </div>
  );
}

export default Card;
