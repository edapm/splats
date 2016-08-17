import React from "react";
import { connect } from "react-redux";
import SplatElement from "./SplatElement.jsx";
import { voteForLeader } from "../actions";

const SplatGrid = ({ className, leaders, vote }) => (
    <div className={className}>
        <div className="splatgrid">
            {leaders.map(leader => (
                <div key={leader.name}>
                    <SplatElement
                        name={leader.name}
                        image={leader.image}
                        vote={() => vote(leader.name)}
                        />
                </div>
            ))}
        </div>
    </div>
);

function mapStateToProps(state, ownProps) {
    return {
        className: ownProps.className,
        leaders: state.leaders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        vote: (name) => dispatch(voteForLeader(name)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplatGrid);
