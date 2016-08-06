import React from "react";
import { connect } from "react-redux";

const SplatGrid = ({ className, leaders }) => (
    <div className={className}>
        <ul>
            {leaders.map(leader => (
                <li key={leader.name}>{leader.name}</li>
            ))}
        </ul>
    </div>
);

function mapStateToProps(state, ownProps) {
    return {
        className: ownProps.className,
        leaders: state.leaders,
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SplatGrid);
