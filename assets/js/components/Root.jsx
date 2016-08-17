import React from "react";
import SplatGrid from "./SplatGrid.jsx";

export default () => (
    <div className="root">
        <h1>Splat a leader!</h1>
        <p>Click a leader to vote for them!</p>
        <SplatGrid className="root-splatgrid" />
    </div>
);
