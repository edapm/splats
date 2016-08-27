import React from "react";

export default ({ name, image, vote }) => (
    <div className="splatelement" onClick={vote}>
        <img
            className="splatelement-image"
            src={image}
            alt={name}
            />
        <div className="splatelement-text">{name}</div>
        <div className="splatelement-dimlayer" />
    </div>
);
