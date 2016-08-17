import React from "react";

export default ({ name, image, vote }) => (
    <div className="splatelement" onClick={vote}>
        <img
            className="splatelement-image"
            src="/images/Alistair.jpg"
            alt={name}
            />
        <div className="splatelement-text">{name}</div>
    </div>
);
