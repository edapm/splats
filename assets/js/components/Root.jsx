import React from "react";
import { connect } from "react-redux";
import SplatGrid from "./SplatGrid.jsx";
import VoteConfirm from "./VoteConfirm.jsx";
import { dialogCancelPressed } from "../actions";

const Root = ({ isDialogVisible, dismissDialog }) => (
    <div className="root">
        <div className="root-background">&nbsp;</div>
        <div className="root-voteconfirm" hidden={!isDialogVisible}>
            <VoteConfirm onClick={dismissDialog} />
        </div>
        <div className="root-content">
            <h1>Splat a leader!</h1>
            <p>Click a leader to vote for them!</p>
            <SplatGrid className="root-splatgrid" />
        </div>
    </div>
);

function mapStateToProps(state) {
    return {
        isDialogVisible: state.isDialogVisible,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dismissDialog: () => dispatch(dialogCancelPressed()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
