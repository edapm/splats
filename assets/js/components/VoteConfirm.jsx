import React from "react";

export default ({ onClick }) => (
    <div className="voteconfirm">
        <div className="voteconfirm-textbox">
            <div className="voteconfirm-textbox-text">
                Thanks for voting!
            </div>
            <button
                onClick={onClick}
                className="voteconfirm-textbox-button"
                >Close</button>
        </div>
    </div>
);
