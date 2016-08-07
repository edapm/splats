import React from "react";

export default ({ name, image, vote }) => (
    <div className="splatelement" onClick={vote}>
        {name}
    </div>
);
