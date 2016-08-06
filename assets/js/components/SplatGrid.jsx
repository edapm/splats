import React from "react";

const SplatGrid = ({ className, leaders }) => (
    <div className={className}>
        <ul>
            {leaders.map(leader => (
                <li key={leader.name}>{leader.name}</li>
            ))}
        </ul>
    </div>
);

export default ({ className }) => (
    <SplatGrid
        className={className}
        leaders={[{name: "Ben"}, {name: "Courtney"}]}
        />
);
